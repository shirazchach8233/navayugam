import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteMember } from "./actions";
import AdminNav from "./AdminNav";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  const withPhotos = await Promise.all(
    (members ?? []).map(async (member) => {
      let photoUrl: string | null = null;
      if (member.photo_path) {
        const { data } = await supabase.storage
          .from("member-photos")
          .createSignedUrl(member.photo_path, 60 * 60);
        photoUrl = data?.signedUrl ?? null;
      }
      return { ...member, photoUrl };
    })
  );

  return (
    <div className="flex flex-1 flex-col">
      <AdminNav active="members" />
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-party-red">Members</h1>
            <p className="font-malayalam text-sm text-foreground/60">അംഗങ്ങൾ</p>
          </div>
          <Link
            href="/admin/members/new"
            className="rounded bg-party-red px-4 py-2 text-sm font-semibold text-party-ivory hover:bg-party-red-dark"
          >
            + Add Member
          </Link>
        </div>

      <div className="mt-8 overflow-x-auto rounded-lg border-2 border-party-red/20">
        <table className="w-full text-left text-sm">
          <thead className="bg-party-red/5 text-foreground/70">
            <tr>
              <th className="px-4 py-3 font-medium">Photo</th>
              <th className="px-4 py-3 font-medium">ID No.</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Unit / Area</th>
              <th className="px-4 py-3 font-medium">Mobile</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withPhotos.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-foreground/50">
                  No members yet. Add the first one.
                </td>
              </tr>
            )}
            {withPhotos.map((member) => (
              <tr key={member.id} className="border-t border-party-red/10">
                <td className="px-4 py-3">
                  {member.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded bg-party-red/10" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{member.id_number}</td>
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.unit_area}</td>
                <td className="px-4 py-3">{member.mobile}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/admin/members/${member.id}/card`}
                      className="text-party-red hover:underline"
                    >
                      View card
                    </Link>
                    <Link
                      href={`/admin/members/${member.id}`}
                      className="text-foreground/70 hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteMember.bind(null, member.id)}>
                      <button
                        type="submit"
                        className="text-foreground/50 hover:text-party-red hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

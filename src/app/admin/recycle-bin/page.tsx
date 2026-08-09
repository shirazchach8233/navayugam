import { createClient } from "@/lib/supabase/server";
import AdminNav from "../AdminNav";
import { purgeExpiredMembers, restoreMember, permanentlyDeleteMember } from "../actions";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

const RECYCLE_BIN_DAYS = 7;

export default async function RecycleBinPage() {
  await purgeExpiredMembers();

  const supabase = await createClient();
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .not("deleted_at", "is", null)
    .order("deleted_at", { ascending: false });

  const now = Date.now();

  return (
    <div className="flex flex-1 flex-col">
      <AdminNav active="recycle-bin" />
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <div>
          <h1 className="text-2xl font-bold text-party-red">Recycle Bin</h1>
          <p className="text-sm text-foreground/60">
            Deleted members are kept here for {RECYCLE_BIN_DAYS} days before being
            permanently removed.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-lg border-2 border-party-red/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-party-red/5 text-foreground/70">
              <tr>
                <th className="px-4 py-3 font-medium">ID No.</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Deleted On</th>
                <th className="px-4 py-3 font-medium">Purges In</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!members || members.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-foreground/50">
                    Recycle bin is empty.
                  </td>
                </tr>
              )}
              {members?.map((member) => {
                const deletedAt = new Date(member.deleted_at as string).getTime();
                const msRemaining =
                  deletedAt + RECYCLE_BIN_DAYS * 24 * 60 * 60 * 1000 - now;
                const daysRemaining = Math.max(0, Math.ceil(msRemaining / (24 * 60 * 60 * 1000)));

                return (
                  <tr key={member.id} className="border-t border-party-red/10">
                    <td className="px-4 py-3 font-medium">{member.id_number}</td>
                    <td className="px-4 py-3">{member.name}</td>
                    <td className="px-4 py-3">
                      {new Date(member.deleted_at as string).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {daysRemaining} day{daysRemaining === 1 ? "" : "s"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-3">
                        <form action={restoreMember.bind(null, member.id)}>
                          <button
                            type="submit"
                            className="text-party-red hover:underline"
                          >
                            Restore
                          </button>
                        </form>
                        <form action={permanentlyDeleteMember.bind(null, member.id)}>
                          <ConfirmDeleteButton name={member.name} />
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

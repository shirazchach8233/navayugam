import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MemberForm from "../MemberForm";
import { updateMember } from "../../actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) notFound();

  let photoUrl: string | null = null;
  if (member.photo_path) {
    const { data } = await supabase.storage
      .from("member-photos")
      .createSignedUrl(member.photo_path, 60 * 60);
    photoUrl = data?.signedUrl ?? null;
  }

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold text-party-red">Edit Member</h1>
      <MemberForm
        action={updateMember.bind(null, id)}
        initial={member}
        photoUrl={photoUrl}
      />
    </div>
  );
}

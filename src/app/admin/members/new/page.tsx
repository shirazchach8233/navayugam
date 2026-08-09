import MemberForm from "../MemberForm";
import { createMember } from "../../actions";

export default function NewMemberPage() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold text-party-red">Add Member</h1>
      <MemberForm action={createMember} />
    </div>
  );
}

import Link from "next/link";
import { logout } from "./actions";

export default function AdminNav({ active }: { active: "members" | "directory" }) {
  const tabClass = (tab: "members" | "directory") =>
    tab === active
      ? "border-b-2 border-party-red pb-3 text-party-red"
      : "pb-3 text-zinc-500 hover:text-party-red";

  return (
    <div className="border-b border-party-red/10 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
        <nav className="flex gap-6 text-sm font-semibold">
          <Link href="/admin" className={tabClass("members")}>
            Members
          </Link>
          <Link href="/admin/directory" className={tabClass("directory")}>
            Search &amp; Export
          </Link>
        </nav>
        <form action={logout}>
          <button
            type="submit"
            className="mb-3 rounded border border-party-red/30 px-4 py-2 text-sm font-medium text-party-red hover:bg-party-red/5"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

import Link from "next/link";
import { logout } from "./actions";

type Tab = "members" | "directory" | "recycle-bin" | "bulk-print";

export default function AdminNav({ active }: { active: Tab }) {
  const tabClass = (tab: Tab) =>
    tab === active
      ? "border-b-2 border-party-red pb-3 text-party-red"
      : "pb-3 text-zinc-500 hover:text-party-red";

  return (
    <div className="border-b border-party-red/10 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-6 pt-6">
        <nav className="flex flex-wrap gap-6 text-sm font-semibold">
          <Link href="/admin" className={tabClass("members")}>
            Members
          </Link>
          <Link href="/admin/directory" className={tabClass("directory")}>
            Search &amp; Export
          </Link>
          <Link href="/admin/bulk-print" className={tabClass("bulk-print")}>
            Bulk Print
          </Link>
          <Link href="/admin/recycle-bin" className={tabClass("recycle-bin")}>
            Recycle Bin
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

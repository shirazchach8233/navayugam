import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "../AdminNav";
import { applyMemberFilters, FILTER_FIELDS } from "./filters";

function toSearchParams(sp: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string" && value.length > 0) params.set(key, value);
  }
  return params;
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const params = toSearchParams(resolvedParams);

  const supabase = await createClient();
  let query = supabase
    .from("members")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  query = applyMemberFilters(query, params);
  const { data: members } = await query;

  const exportHref = `/admin/directory/export${params.toString() ? `?${params.toString()}` : ""}`;

  return (
    <div className="flex flex-1 flex-col">
      <AdminNav active="directory" />
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-party-red">Search &amp; Export</h1>
            <p className="font-malayalam text-sm text-foreground/60">
              തിരയുക &amp; എക്‌സ്‌പോർട്ട്
            </p>
          </div>
          <a
            href={exportHref}
            className="rounded bg-party-red px-4 py-2 text-sm font-semibold text-party-ivory hover:bg-party-red-dark"
          >
            Export CSV ({members?.length ?? 0})
          </a>
        </div>

        <form
          method="get"
          className="mt-6 grid gap-4 rounded-lg border-2 border-party-red/20 bg-white p-6 shadow-sm sm:grid-cols-3"
        >
          <label className="sm:col-span-3 text-sm font-medium text-zinc-700">
            Search (name, ID, mobile, passport, email, iqama)
            <input
              type="text"
              name="q"
              defaultValue={resolvedParams.q as string | undefined}
              placeholder="Type to search…"
              className="mt-1 w-full rounded border border-party-red/20 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-party-red focus:outline-none"
            />
          </label>

          {FILTER_FIELDS.map((field) => (
            <label key={field.key} className="text-sm font-medium text-zinc-700">
              {field.label}
              <input
                type="text"
                name={field.key}
                defaultValue={resolvedParams[field.key] as string | undefined}
                className="mt-1 w-full rounded border border-party-red/20 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-party-red focus:outline-none"
              />
            </label>
          ))}

          <div className="flex items-end gap-3 sm:col-span-3">
            <button
              type="submit"
              className="rounded bg-party-red px-6 py-2 text-sm font-semibold text-party-ivory hover:bg-party-red-dark"
            >
              Filter
            </button>
            <Link
              href="/admin/directory"
              className="text-sm text-zinc-500 hover:text-party-red hover:underline"
            >
              Clear filters
            </Link>
          </div>
        </form>

        <div className="mt-8 overflow-x-auto rounded-lg border-2 border-party-red/20">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <thead className="bg-party-red/5 text-foreground/70">
              <tr>
                <th className="px-4 py-3 font-medium">ID No.</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">District</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Working Zone</th>
                <th className="px-4 py-3 font-medium">Assembly Mandalam</th>
                <th className="px-4 py-3 font-medium">Parliament Mandalam</th>
                <th className="px-4 py-3 font-medium">Blood Group</th>
                <th className="px-4 py-3 font-medium">Mobile</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!members || members.length === 0) && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-foreground/50">
                    No members match these criteria.
                  </td>
                </tr>
              )}
              {members?.map((member) => (
                <tr key={member.id} className="border-t border-party-red/10">
                  <td className="px-4 py-3 font-medium">{member.id_number}</td>
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{member.district}</td>
                  <td className="px-4 py-3">{member.unit}</td>
                  <td className="px-4 py-3">{member.working_zone}</td>
                  <td className="px-4 py-3">{member.assembly_mandalam}</td>
                  <td className="px-4 py-3">{member.parliament_mandalam}</td>
                  <td className="px-4 py-3">{member.blood_group}</td>
                  <td className="px-4 py-3">{member.mobile}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/members/${member.id}`}
                      className="text-party-red hover:underline"
                    >
                      Edit
                    </Link>
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

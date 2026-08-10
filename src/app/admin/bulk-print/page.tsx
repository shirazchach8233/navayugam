import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "../AdminNav";
import { applyMemberFilters, FILTER_FIELDS } from "../directory/filters";
import { CARD_FIELDS, CARD_SIZES } from "./cardFields";
import SelectAllCheckbox from "./SelectAllCheckbox";

function toSearchParams(sp: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string" && value.length > 0) params.set(key, value);
  }
  return params;
}

export default async function BulkPrintPage({
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
    .order("name", { ascending: true });
  query = applyMemberFilters(query, params);
  const { data: members } = await query;

  return (
    <div className="flex flex-1 flex-col">
      <AdminNav active="bulk-print" />
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div>
          <h1 className="text-2xl font-bold text-party-red">Bulk Print ID Cards</h1>
          <p className="font-malayalam text-sm text-foreground/60">
            ബൾക്ക് പ്രിന്റ്
          </p>
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
              href="/admin/bulk-print"
              className="text-sm text-zinc-500 hover:text-party-red hover:underline"
            >
              Clear filters
            </Link>
          </div>
        </form>

        <form
          id="bulk-print-form"
          method="get"
          action="/admin/bulk-print/sheet"
          target="_blank"
          className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]"
        >
          <div className="overflow-x-auto rounded-lg border-2 border-party-red/20">
            <table className="w-full text-left text-sm">
              <thead className="bg-party-red/5 text-foreground/70">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    <SelectAllCheckbox targetName="member_id" formId="bulk-print-form" />
                  </th>
                  <th className="px-4 py-3 font-medium">ID No.</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">District</th>
                  <th className="px-4 py-3 font-medium">Unit</th>
                </tr>
              </thead>
              <tbody>
                {(!members || members.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-foreground/50">
                      No members match these criteria.
                    </td>
                  </tr>
                )}
                {members?.map((member) => (
                  <tr key={member.id} className="border-t border-party-red/10">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        name="member_id"
                        value={member.id}
                        defaultChecked
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{member.id_number}</td>
                    <td className="px-4 py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.district}</td>
                    <td className="px-4 py-3">{member.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-lg border-2 border-party-red/20 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-party-red">
                Card Size
              </h2>
              <div className="mt-3 flex flex-col gap-2">
                {Object.entries(CARD_SIZES).map(([key, size], i) => (
                  <label key={key} className="flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="radio"
                      name="size"
                      value={key}
                      defaultChecked={i === 0}
                      className="h-4 w-4"
                    />
                    {size.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-lg border-2 border-party-red/20 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-party-red">
                Fields to Include
              </h2>
              <div className="mt-3 flex flex-col gap-2">
                {CARD_FIELDS.map((field) => (
                  <label key={field.key} className="flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      name="field"
                      value={field.key}
                      defaultChecked={field.defaultOn}
                      className="h-4 w-4"
                    />
                    {field.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="rounded bg-party-red px-6 py-3 text-sm font-semibold text-party-ivory hover:bg-party-red-dark"
            >
              Generate Print Sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

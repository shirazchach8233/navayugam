export const FILTER_FIELDS = [
  { key: "district", label: "District" },
  { key: "unit", label: "Unit" },
  { key: "working_zone", label: "Working Zone" },
  { key: "assembly_mandalam", label: "Assembly Mandalam" },
  { key: "parliament_mandalam", label: "Parliament Mandalam" },
  { key: "blood_group", label: "Blood Group" },
] as const;

const SEARCH_COLUMNS = [
  "name",
  "id_number",
  "mobile",
  "passport_number",
  "email",
  "iqama_number",
  "native_contact",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMemberFilters(query: any, params: URLSearchParams) {
  const q = params.get("q")?.trim();
  if (q) {
    const escaped = q.replace(/[%,]/g, "");
    query = query.or(
      SEARCH_COLUMNS.map((col) => `${col}.ilike.%${escaped}%`).join(",")
    );
  }

  for (const field of FILTER_FIELDS) {
    const value = params.get(field.key)?.trim();
    if (value) {
      query = query.ilike(field.key, `%${value.replace(/[%,]/g, "")}%`);
    }
  }

  return query;
}

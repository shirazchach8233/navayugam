import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { applyMemberFilters } from "../filters";

const COLUMNS: { key: string; header: string }[] = [
  { key: "id_number", header: "ID Number" },
  { key: "name", header: "Name" },
  { key: "dob", header: "Date of Birth" },
  { key: "blood_group", header: "Blood Group" },
  { key: "passport_number", header: "Passport Number" },
  { key: "iqama_number", header: "Iqama Number" },
  { key: "email", header: "Email" },
  { key: "mobile", header: "Mobile" },
  { key: "native_contact", header: "Native Contact" },
  { key: "job", header: "Job" },
  { key: "unit", header: "Unit" },
  { key: "unit_area", header: "Unit, Area" },
  { key: "working_zone", header: "Working Zone" },
  { key: "district", header: "District" },
  { key: "assembly_mandalam", header: "Assembly Mandalam" },
  { key: "parliament_mandalam", header: "Parliament Mandalam" },
  { key: "created_at", header: "Registered On" },
];

function csvEscape(value: unknown) {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  let query = supabase
    .from("members")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  query = applyMemberFilters(query, request.nextUrl.searchParams);
  const { data: members, error } = await query;

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const rows = [
    COLUMNS.map((c) => csvEscape(c.header)).join(","),
    ...(members ?? []).map((member) =>
      COLUMNS.map((c) => csvEscape(member[c.key])).join(",")
    ),
  ];

  const csv = "﻿" + rows.join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="navayugam-members-${Date.now()}.csv"`,
    },
  });
}

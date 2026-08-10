import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PrintButton from "../../../PrintButton";

const fields = [
  { label: "പേര്", key: "name" as const },
  { label: "ജന്മതീയതി", key: "dob" as const },
  { label: "രക്ത ഗ്രൂപ്പ്", key: "blood_group" as const },
  { label: "പാസ്‌പോർട്ട് നമ്പർ", key: "passport_number" as const },
  { label: "ഇ-മെയിൽ", key: "email" as const },
  { label: "യൂണിറ്റ്, മേഖല", key: "unit_area" as const },
  { label: "മൊബൈൽ", key: "mobile" as const },
];

export default async function MemberCardPage({
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
    <div className="flex flex-1 flex-col items-center gap-6 bg-party-cream px-6 py-10 print:bg-white print:py-0">
      <div className="flex w-full max-w-md items-center justify-between print:hidden">
        <Link href="/admin" className="text-sm text-party-red hover:underline">
          ← Back to members
        </Link>
        <PrintButton />
      </div>

      <div className="flex w-[360px] overflow-hidden rounded-lg border-2 border-party-red bg-white shadow-lg print:shadow-none">
        <div className="font-malayalam flex w-6 shrink-0 items-center justify-center bg-party-red text-xs font-bold tracking-widest text-party-ivory [writing-mode:vertical-rl]">
          IDENTITY CARD
        </div>

        <div className="flex-1 p-4">
          <div className="flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Navayugam" className="h-24 w-24 object-contain" />
            <p className="mt-1 text-xs font-semibold text-party-red">
              <span className="text-zinc-500">ID:</span> {member.id_number}
            </p>
          </div>

          <div className="mt-3 flex items-start gap-3">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt={member.name}
                className="h-20 w-16 shrink-0 rounded border border-party-red/30 object-cover"
              />
            ) : (
              <div className="h-20 w-16 shrink-0 rounded border border-party-red/30 bg-party-red/5" />
            )}

            <dl className="font-malayalam flex-1 space-y-1 text-[11px] leading-tight">
              {fields.map((f) => (
                <div key={f.key} className="flex gap-1">
                  <dt className="w-24 shrink-0 text-zinc-600">{f.label}</dt>
                  <dd className="font-semibold text-zinc-900">
                    : {member[f.key] || "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="font-malayalam mt-3 text-center text-[9px] leading-snug text-zinc-500">
            navayugamdammam@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

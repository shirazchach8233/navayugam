import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PrintButton from "../../PrintButton";
import BulkCard from "../BulkCard";
import { CARD_SIZES, type CardFieldKey, type CardSizeKey } from "../cardFields";

export default async function BulkPrintSheetPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;

  const idsRaw = resolved.member_id;
  const ids = Array.isArray(idsRaw) ? idsRaw : idsRaw ? [idsRaw] : [];

  const fieldsRaw = resolved.field;
  const fields = (Array.isArray(fieldsRaw) ? fieldsRaw : fieldsRaw ? [fieldsRaw] : []) as CardFieldKey[];

  const sizeKey: CardSizeKey = resolved.size === "cr100" ? "cr100" : "cr80";

  const supabase = await createClient();

  const { data: members } = ids.length
    ? await supabase.from("members").select("*").in("id", ids)
    : { data: [] };

  const withPhotos = await Promise.all(
    (members ?? []).map(async (member) => {
      let photoUrl: string | null = null;
      if (member.photo_path) {
        const { data } = await supabase.storage
          .from("member-photos")
          .createSignedUrl(member.photo_path, 60 * 60);
        photoUrl = data?.signedUrl ?? null;
      }
      return { member, photoUrl };
    })
  );

  const size = CARD_SIZES[sizeKey];

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-100 px-6 py-8 print:bg-white print:px-0 print:py-0">
      <style>{`
        @page { size: A4; margin: 10mm; }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="no-print mb-6 flex w-full max-w-3xl items-center justify-between">
        <Link href="/admin/bulk-print" className="text-sm text-party-red hover:underline">
          ← Back to selection
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500">
            {withPhotos.length} card{withPhotos.length === 1 ? "" : "s"} · {size.label}
          </span>
          <PrintButton />
        </div>
      </div>

      {withPhotos.length === 0 ? (
        <p className="no-print text-sm text-zinc-500">
          No members were selected. Go back and pick at least one member to print.
        </p>
      ) : (
        <div
          style={{ maxWidth: "190mm" }}
          className="flex flex-wrap gap-[3mm] bg-white p-[3mm] shadow print:max-w-none print:gap-[3mm] print:p-0 print:shadow-none"
        >
          {withPhotos.map(({ member, photoUrl }) => (
            <BulkCard
              key={member.id}
              member={member}
              photoUrl={photoUrl}
              sizeKey={sizeKey}
              fields={fields}
            />
          ))}
        </div>
      )}
    </div>
  );
}

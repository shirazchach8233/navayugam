import { CARD_FIELDS, CARD_SIZES, type CardFieldKey, type CardSizeKey } from "./cardFields";

function Star({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor">
      <path d="M50 3 L61 37 L97 37 L68 58 L79 92 L50 71 L21 92 L32 58 L3 37 L39 37 Z" />
    </svg>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BulkCard({
  member,
  photoUrl,
  sizeKey,
  fields,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  member: Record<string, any>;
  photoUrl: string | null;
  sizeKey: CardSizeKey;
  fields: CardFieldKey[];
}) {
  const size = CARD_SIZES[sizeKey];
  const dense = fields.length > 7;
  const fieldFontMm = dense ? 2.1 : 2.5;

  const activeFields = CARD_FIELDS.filter((f) => fields.includes(f.key));

  return (
    <div
      style={{
        width: `${size.widthMm}mm`,
        height: `${size.heightMm}mm`,
        breakInside: "avoid",
      }}
      className="flex overflow-hidden border border-party-red bg-white"
    >
      <div
        style={{ width: `${size.widthMm * 0.24}mm` }}
        className="flex shrink-0 flex-col bg-party-red/5"
      >
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-party-red/10" />
        )}
      </div>

      <div style={{ padding: "1.5mm" }} className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-[0.8mm]">
          <Star style={{ width: "2.8mm", height: "2.8mm" }} className="shrink-0 text-party-red" />
          <span style={{ fontSize: "2.3mm" }} className="font-bold leading-none text-party-red">
            Navayugam
          </span>
          <span
            style={{ fontSize: "2mm" }}
            className="ml-auto leading-none text-zinc-500"
          >
            {member.id_number}
          </span>
        </div>

        <p
          style={{ fontSize: "2.9mm", marginTop: "1mm" }}
          className="font-malayalam truncate font-bold leading-tight text-zinc-900"
        >
          {member.name}
        </p>

        <dl style={{ marginTop: "0.8mm", rowGap: "0.4mm" }} className="flex flex-1 flex-col overflow-hidden">
          {activeFields.map((f) => (
            <div key={f.key} style={{ fontSize: `${fieldFontMm}mm` }} className="flex gap-[1mm] leading-tight">
              <dt className="shrink-0 text-zinc-500">{f.label}:</dt>
              <dd className="font-malayalam truncate font-semibold text-zinc-900">
                {member[f.key] || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

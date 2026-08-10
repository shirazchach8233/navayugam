"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded bg-party-red px-4 py-2 text-sm font-semibold text-party-ivory hover:bg-party-red-dark"
    >
      Print / Save as PDF
    </button>
  );
}

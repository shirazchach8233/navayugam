"use client";

export default function ConfirmDeleteButton({ name }: { name: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`Permanently delete ${name}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
      className="text-party-red hover:underline"
    >
      Delete Permanently
    </button>
  );
}

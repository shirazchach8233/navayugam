"use client";

export default function SelectAllCheckbox({
  targetName,
  formId,
}: {
  targetName: string;
  formId: string;
}) {
  return (
    <input
      type="checkbox"
      defaultChecked
      onChange={(e) => {
        const form = document.getElementById(formId) as HTMLFormElement | null;
        form
          ?.querySelectorAll<HTMLInputElement>(`input[name="${targetName}"]`)
          .forEach((el) => {
            el.checked = e.target.checked;
          });
      }}
      className="h-4 w-4"
    />
  );
}

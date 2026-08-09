"use client";

import { useState } from "react";

type Member = {
  id_number: string;
  name: string;
  dob: string | null;
  blood_group: string | null;
  passport_number: string | null;
  email: string | null;
  unit_area: string | null;
  mobile: string | null;
  unit: string | null;
  job: string | null;
  native_contact: string | null;
  district: string | null;
  assembly_mandalam: string | null;
  iqama_number: string | null;
  working_zone: string | null;
  parliament_mandalam: string | null;
};

const inputClass =
  "mt-1 w-full rounded border border-party-red/20 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-party-red focus:outline-none";
const labelClass = "text-sm font-medium text-zinc-700";

export default function MemberForm({
  action,
  initial,
  photoUrl,
}: {
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  initial?: Partial<Member>;
  photoUrl?: string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-lg border-2 border-party-red/20 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          ID Number
          <input
            name="id_number"
            defaultValue={initial?.id_number}
            placeholder={initial ? "" : "Auto-generated if left blank"}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Name
          <input
            name="name"
            required
            defaultValue={initial?.name}
            className={`font-malayalam ${inputClass}`}
          />
        </label>

        <label className={labelClass}>
          Date of Birth
          <input
            type="date"
            name="dob"
            defaultValue={initial?.dob ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Blood Group
          <input
            name="blood_group"
            defaultValue={initial?.blood_group ?? ""}
            placeholder="e.g. B+"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Passport Number
          <input
            name="passport_number"
            defaultValue={initial?.passport_number ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Email
          <input
            type="email"
            name="email"
            defaultValue={initial?.email ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Unit, Area
          <input
            name="unit_area"
            defaultValue={initial?.unit_area ?? ""}
            placeholder="e.g. Faisaliya, Dammam"
            className={`font-malayalam ${inputClass}`}
          />
        </label>

        <label className={labelClass}>
          Mobile
          <input
            name="mobile"
            defaultValue={initial?.mobile ?? ""}
            className={inputClass}
          />
        </label>
      </div>

      <h2 className="mt-8 border-t border-party-red/10 pt-6 text-sm font-semibold uppercase tracking-wide text-party-red">
        Registration Details
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Unit
          <input
            name="unit"
            defaultValue={initial?.unit ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Job
          <input
            name="job"
            defaultValue={initial?.job ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Native Contact
          <input
            name="native_contact"
            defaultValue={initial?.native_contact ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          District
          <input
            name="district"
            defaultValue={initial?.district ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Assembly Mandalam
          <input
            name="assembly_mandalam"
            defaultValue={initial?.assembly_mandalam ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Iqama Number
          <input
            name="iqama_number"
            defaultValue={initial?.iqama_number ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Working Zone
          <input
            name="working_zone"
            defaultValue={initial?.working_zone ?? ""}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Parliament Mandalam
          <input
            name="parliament_mandalam"
            defaultValue={initial?.parliament_mandalam ?? ""}
            className={inputClass}
          />
        </label>
      </div>

      <label className={`mt-4 block ${labelClass}`}>
        Photo
        {photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt="Current photo"
            className="mt-2 h-20 w-20 rounded object-cover"
          />
        )}
        <input type="file" name="photo" accept="image/*" className="mt-1 w-full text-sm text-zinc-700" />
      </label>

      {error && (
        <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-party-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 rounded bg-party-red px-6 py-2 text-sm font-semibold text-party-ivory hover:bg-party-red-dark disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

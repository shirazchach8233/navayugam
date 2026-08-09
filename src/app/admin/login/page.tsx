"use client";

import { useState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-party-cream px-6 py-16">
      <form
        action={handleSubmit}
        className="w-full max-w-sm rounded-lg border-2 border-party-red/20 bg-white p-8 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold text-party-red">
          Navayugam Admin
        </h1>
        <p className="font-malayalam mt-1 text-center text-sm text-zinc-500">
          അഡ്മിൻ ലോഗിൻ
        </p>

        <label className="mt-6 block text-sm font-medium text-zinc-700">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded border border-party-red/20 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-party-red focus:outline-none"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-zinc-700">
          Password
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded border border-party-red/20 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-party-red focus:outline-none"
          />
        </label>

        {error && (
          <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-party-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded bg-party-red py-2 text-sm font-semibold text-party-ivory hover:bg-party-red-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function memberFields(formData: FormData) {
  return {
    id_number: String(formData.get("id_number") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    dob: String(formData.get("dob") ?? "") || null,
    blood_group: String(formData.get("blood_group") ?? "").trim() || null,
    passport_number: String(formData.get("passport_number") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    unit_area: String(formData.get("unit_area") ?? "").trim() || null,
    mobile: String(formData.get("mobile") ?? "").trim() || null,
  };
}

async function uploadPhotoIfProvided(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  idNumber: string
) {
  const photo = formData.get("photo");
  if (!(photo instanceof File) || photo.size === 0) return undefined;

  const ext = photo.name.split(".").pop() || "jpg";
  const path = `${idNumber.replace(/[^a-zA-Z0-9_-]/g, "_")}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("member-photos")
    .upload(path, photo, { upsert: true });

  if (error) throw new Error(error.message);
  return path;
}

export async function createMember(formData: FormData) {
  const supabase = await createClient();
  const fields = memberFields(formData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const photo_path = await uploadPhotoIfProvided(supabase, formData, fields.id_number);

  const { error } = await supabase.from("members").insert({
    ...fields,
    photo_path,
    created_by: user?.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateMember(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = memberFields(formData);

  const photo_path = await uploadPhotoIfProvided(supabase, formData, fields.id_number);

  const { error } = await supabase
    .from("members")
    .update({ ...fields, ...(photo_path ? { photo_path } : {}) })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

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
    unit: String(formData.get("unit") ?? "").trim() || null,
    job: String(formData.get("job") ?? "").trim() || null,
    native_contact: String(formData.get("native_contact") ?? "").trim() || null,
    district: String(formData.get("district") ?? "").trim() || null,
    assembly_mandalam: String(formData.get("assembly_mandalam") ?? "").trim() || null,
    iqama_number: String(formData.get("iqama_number") ?? "").trim() || null,
    working_zone: String(formData.get("working_zone") ?? "").trim() || null,
    parliament_mandalam: String(formData.get("parliament_mandalam") ?? "").trim() || null,
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
  const { id_number, ...fields } = memberFields(formData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: inserted, error } = await supabase
    .from("members")
    .insert({
      ...fields,
      ...(id_number ? { id_number } : {}),
      created_by: user?.id,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  const photo_path = await uploadPhotoIfProvided(supabase, formData, inserted.id_number);
  if (photo_path) {
    await supabase.from("members").update({ photo_path }).eq("id", inserted.id);
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

const RECYCLE_BIN_DAYS = 7;

export async function deleteMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("members")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/recycle-bin");
}

export async function restoreMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("members")
    .update({ deleted_at: null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/recycle-bin");
}

export async function permanentlyDeleteMember(id: string) {
  const supabase = await createClient();

  const { data: member } = await supabase
    .from("members")
    .select("photo_path")
    .eq("id", id)
    .single();

  if (member?.photo_path) {
    await supabase.storage.from("member-photos").remove([member.photo_path]);
  }

  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/recycle-bin");
}

export async function purgeExpiredMembers() {
  const supabase = await createClient();
  const cutoff = new Date(Date.now() - RECYCLE_BIN_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { data: expired } = await supabase
    .from("members")
    .select("id, photo_path")
    .not("deleted_at", "is", null)
    .lt("deleted_at", cutoff);

  if (!expired || expired.length === 0) return;

  const photoPaths = expired.map((m) => m.photo_path).filter((p): p is string => Boolean(p));
  if (photoPaths.length > 0) {
    await supabase.storage.from("member-photos").remove(photoPaths);
  }

  await supabase
    .from("members")
    .delete()
    .in("id", expired.map((m) => m.id));
}

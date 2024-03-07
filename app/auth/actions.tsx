"use server";

import { createDBServerClient } from "@/libs/db/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
  const supabase = createDBServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(email: string, password: string) {
  const supabase = createDBServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message)
    return { isError: true, statusCode: "00", message: error.message };
  } else {
    return { isError: false, statusCode: "01", message: "" };
  }
}

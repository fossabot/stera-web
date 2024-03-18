"use server";

import { createDBServerClient } from "@/libs/db/createClient";
import { setCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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
    setCookie("error", error, {cookies})
    return { isError: true, statusCode: "00", message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/auth/callback");
}

export async function signup(
  email: string,
  password: string,
  urlOrigin: string,
  signupPIN: number,
) {
  const supabase = createDBServerClient();
  const emailRedirectTo = `${urlOrigin}/auth/confirm`;
  console.log(`[actions.ts] emailRedirectTo: ${emailRedirectTo}`);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        signupPIN,
      }
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
    setCookie("error", error, {cookies})
    return { isError: true, statusCode: "00", message: error.message };
  } else {
    return { isError: false, statusCode: "01", message: "" };
  }
}

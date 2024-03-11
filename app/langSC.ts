"use server";

import { VAR_DEFAULT_DISPLANG } from "@/libs/common/commonVar";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export async function getDispLang() {
  const displang = getCookie("dispLang", { cookies }) ?? VAR_DEFAULT_DISPLANG;
  return displang;
}
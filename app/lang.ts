"use client"

import { VAR_DEFAULT_DISPLANG } from "@/libs/common/commonVar";
import { getCookie } from "cookies-next";

export function getDispLang() {
    const displang = getCookie('dispLang') ?? VAR_DEFAULT_DISPLANG
    console.log(`[lang.ts] dispLang: ${displang}`)
    return displang
}
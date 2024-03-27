"use server"

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const redirectTo = request.nextUrl.clone()
    // ここでリダイレクト先を分岐するように
    redirectTo.pathname = "/"
    console.log(`[redirectTo] ${redirectTo.href}`)
    return NextResponse.redirect(redirectTo)
}
import { googleAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const [url, state] = await googleAuth.getAuthorizationUrl();
  // Store state (you might want to use cookies or some other method to store the state)
  return NextResponse.redirect(url.toString());
}
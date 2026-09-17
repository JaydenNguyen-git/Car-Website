import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "signups.jsonl");

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const shopName = typeof body.shopName === "string" ? body.shopName.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  // Bots fill hidden fields. Pretend success without storing anything.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const attribution: Record<string, string> = {};
  for (const key of ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = body[key];
    if (typeof value === "string" && value) attribution[key] = value;
  }

  const record = {
    email,
    shopName: shopName || null,
    ...attribution,
    createdAt: new Date().toISOString(),
  };

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("Failed to store signup", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again." }, { status: 500 });
  }

  // Swap this for a real provider (Resend, Postmark, etc.) to notify the owner per signup.
  console.log("New early-access signup:", record);

  return NextResponse.json({ ok: true });
}

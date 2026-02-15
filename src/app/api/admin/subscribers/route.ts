import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

export async function GET() {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    // Return only confirmed emails
    const confirmed = parsed.subscribers
      .filter((s: any) => s.status === "confirmed")
      .map((s: any) => s.email);
    return NextResponse.json({ 
      subscribers: parsed.subscribers,
      emails: confirmed,
      count: confirmed.length 
    });
  } catch {
    return NextResponse.json({ subscribers: [], emails: [], count: 0 });
  }
}

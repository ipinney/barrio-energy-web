import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

export async function GET() {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ subscribers: [] });
  }
}

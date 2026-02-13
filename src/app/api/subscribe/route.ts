import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

function readSubscribers(): { subscribers: { email: string; subscribedAt: string }[] } {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { subscribers: [] };
  }
}

function writeSubscribers(data: { subscribers: { email: string; subscribedAt: string }[] }) {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const data = readSubscribers();

    const alreadyExists = data.subscribers.some(
      (s) => s.email === trimmedEmail
    );

    if (alreadyExists) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    data.subscribers.push({
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
    });

    writeSubscribers(data);

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

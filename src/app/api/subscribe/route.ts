import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// For now, store locally AND try to add to ConvertKit
// If ConvertKit fails, we still have the local backup
const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

// ConvertKit credentials - using API secret for server-side calls
const CONVERTKIT_API_SECRET = "Y_dZGYV61IhOrrdy2EBi3-FQnVxO-6w7bUbLHFRIEcA";

function readSubscribers(): { subscribers: { email: string; subscribedAt: string; convertkit?: boolean }[] } {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { subscribers: [] };
  }
}

function writeSubscribers(data: { subscribers: { email: string; subscribedAt: string; convertkit?: boolean }[] }) {
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

async function addToConvertKit(email: string): Promise<boolean> {
  try {
    // Try to add via the tags endpoint
    const response = await fetch(
      `https://api.convertkit.com/v3/tags/15953969/subscribers?api_secret=${CONVERTKIT_API_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("ConvertKit error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Read existing subscribers
    const data = readSubscribers();

    // Check if already subscribed
    const alreadyExists = data.subscribers.some((s) => s.email === trimmedEmail);
    if (alreadyExists) {
      return NextResponse.json({ message: "You're already subscribed!" }, { status: 200 });
    }

    // Try to add to ConvertKit (best effort - might fail due to API issues)
    const convertkitSuccess = await addToConvertKit(trimmedEmail);

    // Save locally regardless
    data.subscribers.push({
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
      convertkit: convertkitSuccess,
    });
    writeSubscribers(data);

    const message = convertkitSuccess
      ? "Successfully subscribed!"
      : "Successfully subscribed! (We'll sync with our newsletter service soon)";

    return NextResponse.json({ message, subscribed: true }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

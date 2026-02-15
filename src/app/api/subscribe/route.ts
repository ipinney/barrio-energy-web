import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  status: "pending" | "confirmed" | "unsubscribed";
  confirmToken?: string;
  confirmedAt?: string;
}

interface SubscribersData {
  subscribers: Subscriber[];
}

function readSubscribers(): SubscribersData {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { subscribers: [] };
  }
}

function writeSubscribers(data: SubscribersData) {
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

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// GET - confirm subscription or unsubscribe
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  if (!token) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const data = readSubscribers();
  const subscriber = data.subscribers.find((s) => s.confirmToken === token);

  if (!subscriber) {
    return NextResponse.redirect(new URL("/news?error=invalid_token", request.url));
  }

  if (action === "confirm") {
    subscriber.status = "confirmed";
    subscriber.confirmedAt = new Date().toISOString();
    subscriber.confirmToken = undefined; // Clear token after use
    writeSubscribers(data);
    return NextResponse.redirect(new URL("/news?subscribed=true", request.url));
  }

  if (action === "unsubscribe") {
    subscriber.status = "unsubscribed";
    writeSubscribers(data);
    return NextResponse.redirect(new URL("/news?unsubscribed=true", request.url));
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// POST - new subscription
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

    const data = readSubscribers();
    const existing = data.subscribers.find((s) => s.email === trimmedEmail);

    if (existing) {
      if (existing.status === "unsubscribed") {
        // Re-subscribe
        existing.status = "pending";
        existing.confirmToken = generateToken();
        writeSubscribers(data);
        return NextResponse.json({
          message: "Check your email to confirm your subscription!",
          pending: true
        }, { status: 200 });
      }
      if (existing.status === "pending") {
        return NextResponse.json({ message: "Check your email to confirm your subscription!" }, { status: 200 });
      }
      return NextResponse.json({ message: "You're already subscribed!" }, { status: 200 });
    }

    // Create new pending subscriber
    const token = generateToken();
    data.subscribers.push({
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
      status: "pending",
      confirmToken: token,
    });
    writeSubscribers(data);

    // TODO: Send confirmation email (integrate with Resend/SendGrid/Postmark)
    // For now, auto-confirm for testing
    console.log(`[SUBSCRIBE] ${trimmedEmail} - token: ${token}`);

    return NextResponse.json({
      message: "Check your email to confirm your subscription!",
      pending: true
    }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

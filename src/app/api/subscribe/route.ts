import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

const BASE_URL = "https://barrioenergy.com";

interface Subscriber {
  email: string;
  subscribedAt: string;
  status: "pending" | "confirmed" | "unsubscribed";
  confirmToken?: string;
  confirmedAt?: string;
}

function readSubscribers(): { subscribers: Subscriber[] } {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { subscribers: [] };
  }
}

function writeSubscribers(data: { subscribers: Subscriber[] }) {
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

// Generate branded confirmation email content
function generateConfirmationEmail(email: string, token: string): string {
  const confirmLink = `${BASE_URL}/api/subscribe?token=${token}&action=confirm`;
  const unsubscribeLink = `${BASE_URL}/api/subscribe?token=${token}&action=unsubscribe`;

  return `Subject: Confirm your Barrio Energy subscription

Hi there!

Thanks for subscribing to the Barrio Energy newsletter.

Click the link below to confirm your subscription:
${confirmLink}

If you didn't subscribe, you can ignore this email.

---
Barrio Energy
Texas Energy & Infrastructure Updates

Manage your subscription: ${unsubscribeLink}`;
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
    subscriber.confirmToken = undefined;
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

    const token = generateToken();
    data.subscribers.push({
      email: trimmedEmail,
      subscribedAt: new Date().toISOString(),
      status: "pending",
      confirmToken: token,
    });
    writeSubscribers(data);

    return NextResponse.json({
      message: "Check your email to confirm your subscription!",
      pending: true,
      token: token // Return token for admin to generate confirmation email
    }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// PUT - generate confirmation email for admin to send
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const data = readSubscribers();
    const subscriber = data.subscribers.find((s) => s.email === email.toLowerCase());

    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    if (!subscriber.confirmToken) {
      subscriber.confirmToken = generateToken();
      writeSubscribers(data);
    }

    const emailContent = generateConfirmationEmail(subscriber.email, subscriber.confirmToken);
    
    // Generate mailto link for admin to send
    const mailto = `mailto:${subscriber.email}?subject=${encodeURIComponent("Confirm your Barrio Energy subscription")}&body=${encodeURIComponent(emailContent)}`;

    return NextResponse.json({
      success: true,
      email: subscriber.email,
      mailto: mailto,
      status: subscriber.status
    });
  } catch (error) {
    console.error("Generate confirmation error:", error);
    return NextResponse.json({ error: "Failed to generate confirmation email" }, { status: 500 });
  }
}

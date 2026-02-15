import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");
const RESEND_API_KEY = "re_E8jrtiuT_4hSEj47coq5AZPkEiKWArmaP";
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

// Fire-and-forget email (non-blocking)
function sendEmailBg(to: string, subject: string, html: string) {
  fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Barrio Energy <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: html,
    }),
  }).catch(err => console.error("Email error:", err));
}

function generateConfirmationHtml(email: string, token: string): string {
  const confirmLink = `${BASE_URL}/api/subscribe?token=${token}&action=confirm`;
  const unsubLink = `${BASE_URL}/api/subscribe?token=${token}&action=unsubscribe`;
  return `
<div style="background:#0a0a0a;padding:40px 20px;font-family:-apple-system,sans-serif;">
  <div style="max-width:500px;margin:0 auto;background:#18181b;border-radius:16px;border:1px solid #27272a;">
    <div style="padding:32px;text-align:center;">
      <h1 style="color:#22d3ee;font-size:24px;margin:0;">Welcome to Barrio Energy</h1>
    </div>
    <div style="padding:16px 32px 32px;">
      <p style="color:#e4e4e7;font-size:16px;margin:0 0 16px;">Thanks for subscribing!</p>
      <p style="color:#a1a1aa;font-size:14px;margin:0 0 24px;">Click below to confirm:</p>
      <a href="${confirmLink}" style="display:inline-block;padding:14px 32px;background:#22d3ee;color:#0a0a0a;font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">Confirm Subscription</a>
      <p style="color:#71717a;font-size:12px;margin:24px 0 0;"><a href="${unsubLink}" style="color:#22d3ee;">Unsubscribe</a></p>
    </div>
  </div>
</div>`;
}

// GET - confirm or unsubscribe
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  if (!token) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const data = readSubscribers();
  const sub = data.subscribers.find(s => s.confirmToken === token);
  if (!sub) return NextResponse.redirect(new URL("/news?error=invalid", request.url));

  if (action === "confirm") {
    sub.status = "confirmed";
    sub.confirmedAt = new Date().toISOString();
    sub.confirmToken = undefined;
    writeSubscribers(data);
    return NextResponse.redirect(new URL("/news?subscribed=true", request.url));
  }

  if (action === "unsubscribe") {
    sub.status = "unsubscribed";
    writeSubscribers(data);
    return NextResponse.redirect(new URL("/news?unsubscribed=true", request.url));
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// POST - subscribe
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();
    const data = readSubscribers();
    const existing = data.subscribers.find(s => s.email === trimmed);

    if (existing) {
      if (existing.status === "unsubscribed") {
        existing.status = "pending";
        existing.confirmToken = generateToken();
        writeSubscribers(data);
        sendEmailBg(existing.email, "Confirm your subscription", generateConfirmationHtml(existing.email, existing.confirmToken));
        return NextResponse.json({ message: "Check your email!", pending: true });
      }
      if (existing.status === "pending") return NextResponse.json({ message: "Check your email!" });
      return NextResponse.json({ message: "Already subscribed!" });
    }

    const token = generateToken();
    data.subscribers.push({
      email: trimmed,
      subscribedAt: new Date().toISOString(),
      status: "pending",
      confirmToken: token,
    });
    writeSubscribers(data);

    // Send confirmation email (non-blocking)
    sendEmailBg(trimmed, "Confirm your subscription", generateConfirmationHtml(trimmed, token));

    return NextResponse.json({ message: "Check your email to confirm!", pending: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

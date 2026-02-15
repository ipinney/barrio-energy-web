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

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
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
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error("Resend error:", error);
    return false;
  }
  return true;
}

function generateConfirmationEmailHtml(email: string, token: string): string {
  const confirmLink = `${BASE_URL}/api/subscribe?token=${token}&action=confirm`;
  const unsubscribeLink = `${BASE_URL}/api/subscribe?token=${token}&action=unsubscribe`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #18181b; border-radius: 16px; border: 1px solid #27272a;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 16px; text-align: center;">
              <h1 style="margin: 0; color: #22d3ee; font-size: 24px; font-weight: 700;">
                Welcome to Barrio Energy
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 16px 32px 32px;">
              <p style="margin: 0 0 16px; color: #e4e4e7; font-size: 16px; line-height: 1.6;">
                Thanks for subscribing to our Texas energy and infrastructure newsletter!
              </p>
              <p style="margin: 0 0 24px; color: #a1a1aa; font-size: 14px; line-height: 1.6;">
                Click the button below to confirm your subscription.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${confirmLink}" style="display: inline-block; padding: 14px 32px; background-color: #22d3ee; color: #0a0a0a; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Confirm Subscription
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 24px 0 0; color: #71717a; font-size: 12px; line-height: 1.6;">
                If you didn't subscribe, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; color: #52525b; font-size: 12px;">
                © ${new Date().getFullYear()} Barrio Energy. All rights reserved.
              </p>
              <p style="margin: 8px 0 0; color: #52525b; font-size: 12px;">
                <a href="${unsubscribeLink}" style="color: #22d3ee; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
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
        
        // Send confirmation email
        const html = generateConfirmationEmailHtml(existing.email, existing.confirmToken);
        await sendEmail(existing.email, "Confirm your Barrio Energy subscription", html);
        
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

    // Send confirmation email automatically
    const html = generateConfirmationEmailHtml(trimmedEmail, token);
    await sendEmail(trimmedEmail, "Confirm your Barrio Energy subscription", html);

    return NextResponse.json({
      message: "Check your email to confirm your subscription!",
      pending: true
    }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

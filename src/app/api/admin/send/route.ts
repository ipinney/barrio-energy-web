import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");
const RESEND_API_KEY = "re_E8jrtiuT_4hSEj47coq5AZPkEiKWArmaP";

function generateNewsletterHtml(body: string): string {
  return `
<div style="background:#0a0a0a;padding:40px 20px;font-family:-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#18181b;border-radius:16px;border:1px solid #27272a;">
    <div style="padding:32px;text-align:center;border-bottom:1px solid #27272a;">
      <h1 style="color:#22d3ee;font-size:28px;margin:0;">Barrio Energy</h1>
      <p style="color:#a1a1aa;font-size:14px;margin:8px 0 0;">Texas Energy & Infrastructure Updates</p>
    </div>
    <div style="padding:32px;">
      ${body.split('\n').map(line => {
        if (!line.trim()) return '';
        if (line.startsWith('# ')) return `<h2 style="color:#fff;font-size:22px;margin:0 0 16px;">${line.substring(2)}</h2>`;
        if (line.startsWith('## ')) return `<h3 style="color:#fff;font-size:18px;margin:24px 0 12px;">${line.substring(3)}</h3>`;
        return `<p style="color:#e4e4e7;font-size:16px;line-height:1.6;margin:0 0 16px;">${line}</p>`;
      }).join('')}
    </div>
    <div style="padding:24px 32px;border-top:1px solid #27272a;text-align:center;">
      <p style="color:#52525b;font-size:12px;margin:0;">© ${new Date().getFullYear()} Barrio Energy. All rights reserved.</p>
    </div>
  </div>
</div>`;
}

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
    const confirmed = data.subscribers.filter((s: any) => s.status === "confirmed");
    return NextResponse.json({ 
      subscribers: data.subscribers,
      emails: confirmed.map((s: any) => s.email),
      count: confirmed.length 
    });
  } catch {
    return NextResponse.json({ subscribers: [], emails: [], count: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subject, body } = await request.json();
    if (!subject || !body) {
      return NextResponse.json({ error: "Subject and body required" }, { status: 400 });
    }

    const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
    const confirmed = data.subscribers.filter((s: any) => s.status === "confirmed");

    if (confirmed.length === 0) {
      return NextResponse.json({ error: "No confirmed subscribers" }, { status: 400 });
    }

    // Send to all (batch for production, single for test)
    const html = generateNewsletterHtml(body);
    const emails = confirmed.map((s: any) => s.email);
    
    // Fire-and-forget send
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Barrio Energy <onboarding@resend.dev>",
        bcc: emails,
        subject: subject,
        html: html,
      }),
    }).catch(err => console.error("Send error:", err));

    return NextResponse.json({ 
      success: true, 
      recipient_count: confirmed.length,
      message: `Sending to ${confirmed.length} subscribers`
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

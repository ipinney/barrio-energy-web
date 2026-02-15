import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");
const RESEND_API_KEY = "re_E8jrtiuT_4hSEj47coq5AZPkEiKWArmaP";

async function sendEmail(to: string[], subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Barrio Energy <news@barrioenergy.com>",
      to: to,
      bcc: to,
      subject: subject,
      html: html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error("Resend error:", error);
    return { success: false, error };
  }
  return { success: true };
}

function generateNewsletterEmailHtml(body: string): string {
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
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #18181b; border-radius: 16px; border: 1px solid #27272a;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 16px; text-align: center;">
              <h1 style="margin: 0; color: #22d3ee; font-size: 28px; font-weight: 700;">
                Barrio Energy
              </h1>
              <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 14px;">
                Texas Energy & Infrastructure Updates
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 24px 32px 32px;">
              ${body.split('\n').map(line => {
                if (line.trim() === '') return '<p style="margin: 0 0 16px; color: #e4e4e7; font-size: 16px; line-height: 1.6;">&nbsp;</p>';
                if (line.startsWith('# ')) return `<h2 style="margin: 0 0 16px; color: #ffffff; font-size: 22px; font-weight: 600;">${line.substring(2)}</h2>`;
                if (line.startsWith('## ')) return `<h3 style="margin: 24px 0 12px; color: #ffffff; font-size: 18px; font-weight: 600;">${line.substring(3)}</h3>`;
                return `<p style="margin: 0 0 16px; color: #e4e4e7; font-size: 16px; line-height: 1.6;">${line}</p>`;
              }).join('')}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; color: #52525b; font-size: 12px;">
                © ${new Date().getFullYear()} Barrio Energy. All rights reserved.
              </p>
              <p style="margin: 8px 0 0; color: #52525b; font-size: 12px;">
                You're receiving this because you subscribed to Barrio Energy updates.
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

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
    const confirmed = data.subscribers
      .filter((s: any) => s.status === "confirmed")
      .map((s: any) => s.email);
    return NextResponse.json({ 
      subscribers: data.subscribers,
      emails: confirmed,
      count: confirmed.length 
    });
  } catch {
    return NextResponse.json({ subscribers: [], emails: [], count: 0 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, body: emailBody } = body;

    if (!subject || !emailBody) {
      return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
    }

    // Read confirmed subscribers
    const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
    const confirmedEmails = data.subscribers
      .filter((s: any) => s.status === "confirmed")
      .map((s: any) => s.email);

    if (confirmedEmails.length === 0) {
      return NextResponse.json({ error: "No confirmed subscribers" }, { status: 400 });
    }

    // Convert body to HTML
    const html = generateNewsletterEmailHtml(emailBody);
    
    // Send via Resend
    const result = await sendEmail(confirmedEmails, subject, html);

    if (!result.success) {
      return NextResponse.json({ error: "Failed to send emails", details: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      recipient_count: confirmedEmails.length,
      message: `Newsletter sent to ${confirmedEmails.length} subscribers`
    });
  } catch (error) {
    console.error("Send error:", error);
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 });
  }
}

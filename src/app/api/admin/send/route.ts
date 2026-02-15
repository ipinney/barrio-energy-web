import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, body: emailBody } = body;

    if (!subject || !emailBody) {
      return NextResponse.json(
        { error: "Subject and body are required" },
        { status: 400 }
      );
    }

    // Read subscribers
    const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
    const confirmedEmails = data.subscribers
      .filter((s: any) => s.status === "confirmed")
      .map((s: any) => s.email);

    if (confirmedEmails.length === 0) {
      return NextResponse.json(
        { error: "No confirmed subscribers" },
        { status: 400 }
      );
    }

    // For now, generate a mailto link
    // In production, you'd integrate with an email service like Resend/SendGrid
    const mailto = `mailto:?bcc=${confirmedEmails.join(",")}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      success: true,
      recipient_count: confirmedEmails.length,
      mailto: mailto,
      message: `Generated email for ${confirmedEmails.length} subscribers`
    });
  } catch (error) {
    console.error("Send error:", error);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}

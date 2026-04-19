import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message, honeypot, turnstileToken } = await req.json();

  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  });
  const verifyData = await verifyRes.json();
  if (!verifyData.success) {
    return NextResponse.json({ error: "Bot verification failed." }, { status: 403 });
  }

  const { error } = await resend.emails.send({
    from: "contact_web@abguven.eu",
    to: "abguven@gmail.com",
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="margin: 0 0 24px; font-size: 20px; color: #111;">New message from your portfolio</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 16px; background: #fff; border-radius: 8px 8px 0 0; border-bottom: 1px solid #eee; font-size: 13px; color: #666; width: 80px;">Name</td>
            <td style="padding: 10px 16px; background: #fff; border-radius: 8px 8px 0 0; border-bottom: 1px solid #eee; font-size: 14px; color: #111;"><strong>${name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px 16px; background: #fff; border-radius: 0 0 8px 8px; font-size: 13px; color: #666;">Email</td>
            <td style="padding: 10px 16px; background: #fff; border-radius: 0 0 8px 8px; font-size: 14px; color: #111;"><a href="mailto:${email}" style="color: #0070f3;">${email}</a></td>
          </tr>
        </table>
        <div style="background: #fff; border-radius: 8px; padding: 16px; font-size: 14px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        <p style="margin: 24px 0 0; font-size: 12px; color: #999;">Sent from abguven.eu portfolio contact form</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

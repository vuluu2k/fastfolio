import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/mailer";

function generateCode(length = 6) {
  const digits = "0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += digits[Math.floor(Math.random() * 10)];
  return out;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const code = generateCode(6);
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Replace any existing tokens for this identifier
    await prisma.verificationToken.deleteMany({ where: { identifier: normalizedEmail } });

    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: code,
        expires,
      },
    });

    await sendOtpEmail(normalizedEmail, code);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send-otp error", e);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}

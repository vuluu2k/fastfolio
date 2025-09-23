import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/mailer";

function generateCode(length = 6) {
  const digits = "0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += digits[Math.floor(Math.random() * 10)];
  return out;
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      // If user exists but not verified, allow re-register to update password and resend OTP
      if (!existing.emailVerified) {
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.user.update({
          where: { email: normalizedEmail },
          data: { name, passwordHash },
        });

        // Issue (or re-issue) OTP
        const code = generateCode(6);
        const expires = new Date(Date.now() + 10 * 60 * 1000);
        await prisma.verificationToken.deleteMany({ where: { identifier: normalizedEmail } });
        await prisma.verificationToken.create({
          data: { identifier: normalizedEmail, token: code, expires },
        });
        await sendOtpEmail(normalizedEmail, code);

        return NextResponse.json({ ok: true, resent: true });
      }

      // If already verified, block and ask user to sign in or reset password
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Create user with hashed password (unverified)
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        emailVerified: null,
      },
    });

    // Issue OTP
    const code = generateCode(6);
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.verificationToken.deleteMany({ where: { identifier: normalizedEmail } });
    await prisma.verificationToken.create({
      data: { identifier: normalizedEmail, token: code, expires },
    });
    await sendOtpEmail(normalizedEmail, code);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

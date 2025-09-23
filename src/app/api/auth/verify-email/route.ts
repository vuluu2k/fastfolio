import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const vt = await prisma.verificationToken.findUnique({ where: { token: code } });
    if (!vt || vt.identifier.toLowerCase() !== normalizedEmail) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    if (vt.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token: vt.token } });
      return NextResponse.json({ error: "Code expired" }, { status: 400 });
    }

    // Mark user verified
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { emailVerified: new Date() },
    });

    // Consume tokens for this email
    await prisma.verificationToken.deleteMany({ where: { identifier: normalizedEmail } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("verify-email error", e);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

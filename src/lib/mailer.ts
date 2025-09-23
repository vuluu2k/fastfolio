export async function sendOtpEmail(to: string, code: string) {
  const from = process.env.EMAIL_FROM || "no-reply@fastfolio.dev";
  const projectName = process.env.PROJECT_NAME || "Fastfolio";

  // Prefer Resend if configured (no extra dependency needed)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `${projectName} verification code: ${code}`,
        html: emailHtml(projectName, code),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Failed to send email via Resend: ${res.status} ${text}`);
    }
    return;
  }

  // Fallback: in development, log the code to the console
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEV] OTP for ${to}: ${code}`);
    return;
  }

  throw new Error(
    "Email delivery is not configured. Set RESEND_API_KEY or configure an email provider."
  );
}

function emailHtml(projectName: string, code: string) {
  return `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; color:#0f172a">
    <h2>${projectName}</h2>
    <p>Your verification code is:</p>
    <div style="font-size: 28px; font-weight: 700; letter-spacing: 6px; background:#f8fafc; padding:12px 16px; display:inline-block; border-radius:8px; border:1px solid #e2e8f0">
      ${code}
    </div>
    <p style="margin-top:16px">This code will expire in 10 minutes.</p>
    <p>If you did not request this, you can ignore this email.</p>
  </div>`;
}

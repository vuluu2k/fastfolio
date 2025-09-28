"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import * as React from "react";

export default function AuthSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

"use client";

import { ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;

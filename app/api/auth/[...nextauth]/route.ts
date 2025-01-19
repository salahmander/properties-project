import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions as any); //TODO: fix any

export { handler as GET, handler as POST };

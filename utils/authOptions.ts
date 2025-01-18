import GoogleProvider from "next-auth/providers/google";
import type { GoogleProfile } from "next-auth/providers/google";

import connectDB from "@/config/database";
import User from "@/models/User";
import { CustomSession } from "@/types/index.types";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        // This prevents the last google you used to be automatically logged in
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }: { profile: GoogleProfile }) {
      await connectDB();
      const userExist = await User.findOne({ email: profile.email });

      if (!userExist) {
        const username = profile.name.slice(0, 20); // A google username can be between 1 and 64 characters
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }

      return true;
    },
    // session callback that modifies the session object
    async session({ session }: { session: CustomSession }) {
      const user = await User.findOne({ email: session.user.email });

      if (user) {
        session.user.id = user._id.toString(); // Ensures the ID is a string
      }

      return session;
    },
  },
};

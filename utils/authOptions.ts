import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/database";
import User from "@/models/User";
import type { CustomSession, GoogleProfileType } from "@/types/index.types";

/**
 * Authentication options for the application.
 * 
 * @property {Array} providers - List of authentication providers.
 * @property {Object} callbacks - Callback functions for authentication events.
 * 
 * @example
 * // Example usage of authOptions
 * import { authOptions } from './utils/authOptions';
 * 
 * @typedef {Object} GoogleProfileType - Type definition for Google profile.
 * @typedef {Object} CustomSession - Type definition for custom session.
 * 
 * @callback signIn
 * @param {Object} params - Parameters for the signIn callback.
 * @param {GoogleProfileType | undefined} params.profile - Google profile information.
 * @returns {Promise<boolean>} - Returns true if sign in is successful.
 * 
 * @callback session
 * @param {Object} params - Parameters for the session callback.
 * @param {CustomSession} params.session - Custom session object.
 * @returns {Promise<CustomSession>} - Returns the modified session object.
 */
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
    async signIn({ profile }: { profile: GoogleProfileType | undefined }) {
      await connectDB();
      const userExist = await User.findOne({ email: profile?.email });

      if (!userExist) {
        const username = profile?.name.slice(0, 20); // A google username can be between 1 and 64 characters
        await User.create({
          username,
          email: profile?.email,
          image: profile?.picture,
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

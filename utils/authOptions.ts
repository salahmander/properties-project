import GoogleProvider from "next-auth/providers/google";

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
    async signIn({ profile }) {
        // Connect to the database and check if the user exists
        // otherwise create a new user
        // return true if the user is authenticated
    },
    // session callback that modifies the session object
    async session({ session }) {
        // Get the user from the database
        // assign user id from the session
        // return session
    },
  },
};

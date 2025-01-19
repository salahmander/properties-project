import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { CustomSession } from "@/types/index.types";

/**
 * Retrieves the current session user.
 *
 * This function fetches the current session using the `getServerSession` function
 * and returns an object containing the user and userId if the session and user exist.
 * If the session or user does not exist, it returns null.
 *
 * @returns {Promise<{ user: CustomUser; userId: string } | null>} An object containing the user and userId, or null if no session or user is found.
 */
export const getSessionUser = async () => {
  const session = (await getServerSession(authOptions as any)) as CustomSession; //TODO: fix any

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};

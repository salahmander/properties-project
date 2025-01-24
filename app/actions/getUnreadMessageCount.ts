"use server";
import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSession";

/**
 * Retrieves the count of unread messages for the currently authenticated user.
 *
 * @async
 * @function getUnreadMessageCount
 * @throws {Error} If the user ID is not available in the session.
 * @returns {Promise<{ count: number }>} An object containing the count of unread messages.
 */
const getUnreadMessageCount = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    unread: false,
  });

  return { count };
};

export default getUnreadMessageCount;

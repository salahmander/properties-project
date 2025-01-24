"use server";

import { revalidatePath } from "next/cache";

import Message from "@/models/Messages";

import connectDB from "@/config/database";

import { getSessionUser } from "@/utils/getSession";

import type { Types } from "mongoose";

/**
 * Deletes a message by its ID.
 *
 * @param {Types.ObjectId} messageId - The ID of the message to delete.
 * @throws {Error} If the user is not authenticated.
 * @throws {Error} If the message is not found.
 * @throws {Error} If the user is not authorized to delete the message.
 * @returns {Promise<void>} A promise that resolves when the message is deleted.
 */
const deleteMessage = async (messageId: Types.ObjectId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message Not Found");

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // revalidate cache
  revalidatePath("/messages", "page");

  await message.deleteOne();
};

export default deleteMessage;

"use server";

import { revalidatePath } from "next/cache";

import Message from "@/models/Messages";

import connectDB from "@/config/database";

import { getSessionUser } from "@/utils/getSession";

import type { Types } from "mongoose";

/**
 * Marks a message as read or unread based on its current state.
 * 
 * @param {Types.ObjectId} messageId - The ID of the message to be marked as read or unread.
 * @returns {Promise<boolean | { error: string }>} - Returns the updated read status of the message or an error object if the user ID is not found.
 * 
 * @throws {Error} If the message is not found.
 * @throws {Error} If the user is not authorized to mark the message as read.
 */
const markMessageAsRead = async (messageId: Types.ObjectId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("message not found");

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
};

export default markMessageAsRead;

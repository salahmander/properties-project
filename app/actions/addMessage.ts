"use server";
import connectDB from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSession";

/**
 * Adds a new message to the database.
 *
 * @param {FormData} formData - The form data containing message details.
 * @returns {Promise<{ submitted?: boolean; error?: string }>} - An object indicating the result of the operation.
 * @throws {Error} - Throws an error if the user ID is not found in the session.
 */
const addMessage = async (formData: FormData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const recipient = formData.get("recipient");

  if (userId === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return { submitted: true };
};

export default addMessage;

"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/config/database";

import User from "@/models/User";

import { getSessionUser } from "@/utils/getSession";

import type { Types } from "mongoose";

/**
 * Toggles the bookmark status of a property for the current user.
 * 
 * @param propertyId - The ID of the property to bookmark or remove from bookmarks.
 * @returns An object containing a message indicating the action taken and the new bookmark status.
 * @throws Will throw an error if the user is not authenticated.
 */
const bookmarkProperty = async (propertyId: Types.ObjectId) => {
  const sessionUser = await getSessionUser();

  // Check user session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  await connectDB();

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmark.includes(propertyId);

  let message;

  if (isBookmarked) {
    user.bookmark.pull(propertyId);
    message = "Bookmark Removed";
    isBookmarked = false;
  } else {
    user.bookmark.push(propertyId);
    message = "Bookmarked";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
};

export default bookmarkProperty;

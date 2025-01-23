"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/config/database";

import User from "@/models/User";

import { getSessionUser } from "@/utils/getSession";

import type { Types } from "mongoose";

/**
 * Checks if a property is bookmarked by the current session user.
 *
 * @param {Types.ObjectId} propertyId - The ID of the property to check.
 * @returns {Promise<{ isBookmarked: boolean } | { error: string }>} - An object indicating whether the property is bookmarked or an error message if the user ID is not available.
 *
 * @throws {Error} If there is an issue connecting to the database or retrieving the session user.
 */
const checkBookmarkStatus = async (propertyId: Types.ObjectId) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmark.includes(propertyId);

  return { isBookmarked };
};

export default checkBookmarkStatus;

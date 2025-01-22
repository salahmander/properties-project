'use server'
import { revalidatePath } from "next/cache";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";

import { getSessionUser } from "@/utils/getSession";

import type { Types } from "mongoose";

/**
 * Deletes a property by its ID.
 * 
 * @param {string} propertyId - The ID of the property to be deleted.
 * @throws Will throw an error if the user is not authenticated.
 * @throws Will throw an error if the property is not found.
 * @throws Will throw an error if the user is not the owner of the property.
 * 
 * @returns {Promise<void>} - A promise that resolves when the property is deleted.
 */
const deleteProperty = async (propertyId: Types.ObjectId) => {
  const sessionUser = await getSessionUser();

  // Check user session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("property Not found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized!");
  }

  // Extracts the public IDs from an array of image URLs.
  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/") || [];
    const publicId = parts.pop() || "";
    return publicId.split(".").slice(0, -1).join(".");
  });

  // Delete images from cloudinary
  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy('wrongmove/' + publicId);
    }
  }

  // delete property
  await property.deleteOne();

  revalidatePath("/", "layout");
};

export default deleteProperty;

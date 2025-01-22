"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import connectDB from "@/config/database";
import Property from "@/models/Property";

import { getSessionUser } from "@/utils/getSession";

import type { Types } from "mongoose";

/**
 * Updates a property with the provided form data.
 *
 * @param propertyId - The ID of the property to update.
 * @param formData - The form data containing the updated property information.
 * @throws Will throw an error if the user is not authenticated or does not own the property.
 * @throws Will throw an error if the property is not found.
 * @returns A promise that resolves when the property is updated and the user is redirected.
 */
const updateProperty = async (
  propertyId: Types.ObjectId,
  formData: FormData
) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("property Not found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized! Current user does not own this property");
  }

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      postcode: formData.get("location.postcode"),
      city: formData.get("location.city"),
      county: formData.get("location.county"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_meters: formData.get("square_meters"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");

  redirect(`/properties/${updatedProperty._id}`);
};

export default updateProperty;

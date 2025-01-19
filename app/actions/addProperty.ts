"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Adds a new property to the database.
 *
 * This function connects to the database, retrieves the session user, and constructs
 * a property object from the provided form data. It then saves the new property to the
 * database, revalidates the path, and redirects to the newly created property's page.
 *
 * @param {FormData} formData - The form data containing property details.
 * @throws {Error} If the user ID is not found in the session.
 * @returns {Promise<void>} A promise that resolves when the property is successfully added.
 */
const addProperty = async (formData: FormData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // Access all values for amenities and images
  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => (image as File).name !== "")
    .map((image) => (image as File).name);

  // Create the propertyData object with embedded seller_info
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
    amenities,
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
    images,
  };

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");

  redirect(`/properties/${newProperty._id}`);
};

export default addProperty;

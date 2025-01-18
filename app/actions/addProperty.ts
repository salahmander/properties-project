"use server";

const addProperty = async (formData: FormData) => {
  // Access all values for amenities and images
  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => (image as File).name !== "");

  // Create the propertyData object with embedded seller_info
  const propertyData = {
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

  console.log(propertyData);
};

export default addProperty;

import connectDB from "@/config/database";

import Property from "@/models/Property";

import PropertyEditForm from "@/components/PropertyEditForm/PropertyEditForm";

import { convertToSerializableObject } from "@/utils/convertToObject";

import type { PropertyType } from "@/types/properties.types";

type PropertyEditPageProp = {
  params: Promise<{ id: string }>;
};

const PropertyEditPage = async ({ params }: PropertyEditPageProp) => {
  await connectDB();
  const { id } = await params;

  const propertyDoc = await Property.findById(id).lean();

  if (!propertyDoc) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  const property = convertToSerializableObject(propertyDoc) as PropertyType;

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;

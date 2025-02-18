import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";

import connectDB from "@/config/database";
import Property from "@/models/Property";

import PropertyHeaderImage from "@/components/Property/PropertyHeaderImage/PropertyHeaderImage";

import PropertyDetails from "@/components/Property/PropertyDetails/PropertyDetails";
import PropertyImages from "@/components/Property/PropertyImages/PropertyImages";

import { convertToSerializableObject } from "@/utils/convertToObject";

import type { PropertyType } from "@/types/properties.types";
import BookmarkButton from "@/components/Buttons/BookmarkButton/BookmarkButton";
import ShareButton from "@/components/Buttons/ShareButton/ShareButton";
import PropertyContactForm from "@/components/Property/PropertyContactForm/PropertyContactForm";

type PropertiesPageProps = {
  params: Promise<{ id: string }>;
};

const PropertyPage = async ({ params }: PropertiesPageProps) => {
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
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButton property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;

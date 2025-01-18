import Link from "next/link";

import connectDB from "@/config/database";
import Property from "@/models/Property";

import PropertyHeaderImage from "@/components/PropertyHeaderImage/PropertyHeaderImage";

import type { PropertyType } from "@/types/properties.types";

import { FaArrowLeft } from "react-icons/fa";

type PropertiesPageProps = {
  params: {
    id: string;
  };
};

const PropertyPage = async ({ params }: PropertiesPageProps) => {
  await connectDB();
  const property = await Property.findById(params.id).lean() as unknown as PropertyType;

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6"></div>
        </div>
      </section>
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

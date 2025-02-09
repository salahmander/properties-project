import Link from "next/link";

import connectDB from "@/config/database";

import Property from "@/models/Property";

import PropertySearchForm from "@/components/PropertySearchForm/PropertySearchForm";

import { PropertyTypes } from "@/utils/constant";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { FaArrowAltCircleDown } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

import type { PropertiesType } from "@/types/properties.types";

type SearchResultsPageParams = {
  searchParams: Promise<{ location?: string; propertyType?: string }>;
};

const SearchResultsPage = async ({ searchParams }: SearchResultsPageParams) => {
  const { location, propertyType } = await searchParams;

  await connectDB();

  const locationPattern = location ? new RegExp(location, "i") : /.*/;

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.county": locationPattern },
      { "location.postcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== PropertyTypes.All) {
    const typePattern = new RegExp(propertyType, "i");
    (query as any).type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(
    propertiesQueryResults
  ) as PropertiesType;

  console.log({ properties });

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleDown className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id.toString()} {...property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;

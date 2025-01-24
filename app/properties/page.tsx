import connectDB from "@/config/database";
import Property from "@/models/Property";

import PropertyCard from "@/components/PropertyCard/PropertyCard";

import type { PropertiesType } from "@/types/properties.types";
import Pagination from "@/components/Pagination/Pagination";
import { parse } from "path";

type PropertiesPageProps = {
  searchParams: {
    pageSize: string;
    page: string;
  };
};

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  await connectDB();

  const { pageSize = "9", page = "1" } = await searchParams;

  const pageSizeInt = parseInt(pageSize)
  const pageInt = parseInt(page)

  const skip = (pageInt - 1) * pageSizeInt;

  const total = await Property.countDocuments({});
  const properties = (await Property.find({})
    .skip(skip)
    .limit(pageSizeInt)
    .lean()) as unknown as PropertiesType;

  // Calculate if pagination is needed
  const showPagination = total > pageSizeInt;

  return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard {...property} key={property._id.toString()} />
              ))}
            </div>
          )}
          {showPagination && (
            <Pagination
              page={pageInt}
              pageSize={pageSizeInt}
              totalProperties={total}
            />
          )}
        </div>
      </section>
  );
};

export default PropertiesPage;

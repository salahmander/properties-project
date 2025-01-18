import connectDB from "@/config/database";
import Property from "@/models/Property";

import PropertyCard from "@/components/PropertyCard/PropertyCard";

import type { PropertiesType } from "@/types/properties.types";

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean() as unknown as PropertiesType;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id.toString()} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;

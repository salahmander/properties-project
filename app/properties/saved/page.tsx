import User from "@/models/User";

import PropertyCard from "@/components/PropertyCard/PropertyCard";

import { getSessionUser } from "@/utils/getSession";

import type { PropertiesType, PropertyType } from "@/types/properties.types";
import { UserType } from "@/types/index.types";

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.userId;

  const user = (await User.findById(userId)
    .populate("bookmarks")
    .lean()
    .exec()) as UserType;
    
  console.log({user});
  const bookmarks = user?.bookmarks;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property: PropertyType) => (
              <PropertyCard key={property._id.toString()} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

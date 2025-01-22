"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import deleteProperty from "@/app/actions/deleteProperty";

import type { PropertiesType } from "@/types/properties.types";
import type { Types } from "mongoose";
import { toast } from "react-toastify";

type initialProperties = {
  initialProperties: PropertiesType;
};

const ProfileProperties = ({ initialProperties }: initialProperties) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: Types.ObjectId) => {
    const confirmed = window.confirm(
      "Are you sure you wan to delete this property?"
    );

    if (!confirmed) return;

    await deleteProperty(propertyId);

    const updatedProperties = properties.filter((property) => property._id !== propertyId);

    setProperties(updatedProperties);

    toast.success("Property Deleted successfully");
  };

  return properties.map((property) => (
    <div key={property._id.toString()} className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={500}
          height={100}
          priority={true}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street}, {property.location.postcode},
          {property.location.city}, {property.location.county}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;

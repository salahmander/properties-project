import Image from "next/image";
import Link from "next/link";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

import { getRateDisplay } from "./PropertyCard.helpers";

import type { PropertyType } from "@/types/properties.types";

const PropertyCard = (property: PropertyType) => {
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={`/images/properties/${property.images[0]}`}
        alt=""
        height="0"
        width="0"
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay(property.rates)}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" />{" "}
            <span className="md:hidden lg:inline">{property.beds} Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" />{" "}
            <span className="md:hidden lg:inline">{property.baths} Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />{" "}
            <span className="md:hidden lg:inline">
              {property.square_meters} m²
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" />{" "}
              <span className="md:hidden lg:inline">
                £{property.rates.nightly} Nightly
              </span>
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" />{" "}
              <span className="md:hidden lg:inline">
                £{property.rates.weekly} Weekly
              </span>
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" />{" "}
              <span className="md:hidden lg:inline">
                £{property.rates.monthly} Monthly
              </span>
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700" />
            <span className="text-orange-700">
              {property.location.city}, {property.location.county}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

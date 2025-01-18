import type { Types } from "mongoose";

export type LocationType = {
  street: string;
  postcode: string;
  city: string;
  county: string;
};

export type RatesType = {
  nightly?: number;
  weekly?: number;
  monthly?: number;
};

export type SellerInfoType = {
  name: string;
  email: string;
  phone: string;
};

export type PropertyType = {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  type: string; // e.g. "Flat", "Maisonette", "Cottage or Cabin", etc.
  description: string;
  location: LocationType;
  beds: number;
  baths: number;
  square_meters: number;
  amenities: string[];
  rates: RatesType;
  seller_info: SellerInfoType;
  images: string[];
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertiesType = PropertyType[];

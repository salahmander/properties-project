export type Location = {
  street: string;
  postcode: string;
  city: string;
  county: string; 
};

export type Rates = {
  nightly?: number;
  weekly?: number;
  monthly?: number;
};

export type SellerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type Property = {
  _id: string;
  owner: string;
  name: string;
  type: string; // e.g. "Flat", "Maisonette", "Cottage or Cabin", etc.
  description: string;
  location: Location;
  beds: number;
  baths: number;
  square_meters: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Properties = Property[];

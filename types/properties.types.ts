// TODO: Will need to change the data to reflect properties in the UK

export type Location = {
  street: string;
  city: string;
  state: string;
  zipcode: string; 
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
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Properties = Property[];

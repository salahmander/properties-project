export const PropertyTypes = Object.freeze({
  All: "All",
  Flat: "Flat",
  Studio: "Studio",
  Maisonette: "Maisonette",
  House: "House",
  Bungalow: "Bungalow",
  Cottage: "Cottage",
  Loft: "Loft",
  Room: "Room",
  Other: "Other",
} as const);

export const PropertyTypesArray = Object.values(PropertyTypes);
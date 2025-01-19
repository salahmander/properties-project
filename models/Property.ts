import { Schema, model, models } from "mongoose";

/**
 * PropertySchema defines the schema for the Property model.
 * 
 * @typedef {Object} Property
 * @property {mongoose.Types.ObjectId} owner - A required reference to the User model.
 * @property {string} name - The property's name. This field is required.
 * @property {string} type - The type of the property (e.g., Apartment, House). This field is required.
 * @property {string} description - A description of the property. This field is required.
 * @property {Object} location - The location details of the property.
 * @property {string} location.street - The street address. This field is required.
 * @property {string} location.postCode - The postcode. This field is required.
 * @property {string} location.city - The city. This field is required.
 * @property {string} location.county - The county. This field is required.
 * @property {number} beds - The number of bedrooms. This field is required.
 * @property {number} baths - The number of bathrooms. This field is required.
 * @property {number} square_meters - The size of the property in square meters. This field is required.
 * @property {string[]} [amenities] - A list of amenities available at the property.
 * @property {Object} rates - The rental rates for the property.
 * @property {number} [rates.nightly] - The nightly rental rate.
 * @property {number} [rates.weekly] - The weekly rental rate.
 * @property {number} [rates.monthly] - The monthly rental rate.
 * @property {Object} seller_info - The seller's contact information.
 * @property {string} seller_info.name - The seller's name. This field is required.
 * @property {string} seller_info.email - The seller's email. This field is required.
 * @property {string} seller_info.phone - The seller's phone number. This field is required.
 * @property {string[]} [images] - A list of image URLs for the property.
 * @property {boolean} is_featured - Indicates if the property is featured. Defaults to false.
 * @property {Date} createdAt - The date and time when the property was created. Automatically managed by Mongoose.
 * @property {Date} updatedAt - The date and time when the property was last updated. Automatically managed by Mongoose.
 */
const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      street: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      county: {
        type: String,
        required: true,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_meters: {
      type: Number,
      required: true,
    },
    amenities: [{ type: String }],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    images: [{ type: String }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;

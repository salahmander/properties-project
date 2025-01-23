import { Schema, model, models } from "mongoose";

/**
 * UserSchema defines the schema for the User model.
 * 
 * @typedef {Object} User
 * @property {string} email - The user's unique email address. This field is required and must be unique.
 * @property {string} username - The user's display name. This field is required and must be unique.
 * @property {string} [image] - URL to the user's profile image.
 * @property {mongoose.Types.ObjectId[]} [bookmarks] - An array of references to `Property` documents that the user has bookmarked.
 * @property {Date} createdAt - The date and time when the user was created. Automatically managed by Mongoose.
 * @property {Date} updatedAt - The date and time when the user was last updated. Automatically managed by Mongoose.
 */

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const User = models.User || model("User", UserSchema);

export default User;

import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import isUrl from "is-url";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    emailVerified: {
      type: Boolean,
    },
    password: {
      type: String,
      minlength: 6,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    pictureUrl: {
      type: String,
      validate: {
        validator: (value) => isUrl(value),
        message: (props) => `${props.value} is not a valid url!`,
      },
    },
    signature: { type: String, trim: true },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

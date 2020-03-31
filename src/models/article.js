import mongoose from "mongoose";
// import isEmail from "validator/lib/isEmail";
import isUrl from "is-url";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    coverImage: {
      type: String,
      validate: (value) => isUrl(value),
    },

    tags: {
      tags: { type: [String], index: true },
    },

    publishDate: Date,
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

ArticleSchema.plugin(updateIfCurrentPlugin);

// TODO Implement finding other article  from the same author
// ArticleSchema.methods.findOtherArticle = function (cb) {
//   return this.model("Article").find({ type: this.type }, cb);
// };

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);

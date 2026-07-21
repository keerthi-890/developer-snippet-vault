// This model describes what a "Snippet" document looks like in MongoDB.

import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    // Every snippet belongs to a specific user.
    // This "ref" links to the User model, so we can populate user info later if needed.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Programming language is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt (used for "Recently added")
  }
);

const Snippet = mongoose.model("Snippet", snippetSchema);

export default Snippet;

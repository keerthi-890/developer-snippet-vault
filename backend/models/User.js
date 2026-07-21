// A "model" describes the SHAPE of the data we store in MongoDB.
// This one describes what a "User" document looks like.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes extra spaces at start/end
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users can share an email
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields.
    timestamps: true,
  }
);

// --- Mongoose Middleware ---
// This function runs automatically BEFORE a user document is saved.
// It hashes (scrambles) the password so we never store it as plain text.
userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or has been changed.
  // (Otherwise, editing a profile would re-hash an already-hashed password.)
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Custom Instance Method ---
// This lets us call user.matchPassword("typedPassword") during login
// to check if the typed password matches the hashed one in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

// This file is responsible for ONE thing: connecting to MongoDB.
// Keeping it separate keeps server.js clean and focused.

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise, so we await it.
    // MONGO_URI comes from our .env file (loaded in server.js).
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails, log the error and stop the app.
    // There's no point running a server that can't reach its database.
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

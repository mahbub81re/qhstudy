import mongoose from "mongoose";


let isConnected = false;

export async function connectToMongoDB() {
  if (isConnected) return; // Prevent multiple connections in dev

  try {
    await mongoose.connect(process.env.DB as string);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

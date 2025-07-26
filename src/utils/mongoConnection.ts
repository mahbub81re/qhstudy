import mongoose from "mongoose";

const uri =
  "mongodb+srv://mollahmahbub81:EoT9O6fjn2zB0DYd@cluster0.euy6krx.mongodb.net/ghstudy-db";

let isConnected = false;

export async function connectToMongoDB() {
  if (isConnected) return; // Prevent multiple connections in dev

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

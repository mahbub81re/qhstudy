import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/utils/mongoConnection";
import HTextModel from "@/models/h-text";

export async function GET() {
  await connectToMongoDB();
  const data = await HTextModel.find().limit(50); // Fetch first 50
  return NextResponse.json(data);
}

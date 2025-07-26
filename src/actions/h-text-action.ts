"use server"

import HTextModel from "@/models/h-text";
import { connectToMongoDB } from "@/utils/mongoConnection";
import { revalidatePath } from "next/cache";

export async function getHTextById(id: string) {
  try {
    await connectToMongoDB();
    const htext = await HTextModel.findById(id);
    return htext;
  } catch (error) {
    console.error("Error fetching HText by ID:", error);
    return null;
  }
}

export async function createHText(formData: FormData) {
    const text = formData.get("text") as string;
    const sanad_type = formData.get("sanad_type") as string;
    const sanad = formData.get("sanad") as string;
    const source = formData.get("source") as string;

    try {
      await connectToMongoDB();
      await HTextModel.create({
        Text: text,
        sanad: {
          type: sanad_type,
          text: sanad,
        },
        source,
      });
      console.log("HText created successfully");
    } catch (error) {
      console.error("Error creating HText:", error);
    }
  
}


export async function updateHText(formData: FormData, id: string) {
  "use server";

  const text = formData.get("text") as string;
  const source = formData.get("source") as string;

  // Collect sanad data
  const sanadValues = formData.getAll("sanad") as string[];
  const sanadTypes = formData.getAll("sanad_type") as string[];

  const sanadArray = sanadValues.map((s, index) => ({
    type: sanadTypes[index] || "",
    text: s || "",
  }));

  const finalSanad = sanadArray.filter(s => s.text.trim() !== "");

  const payload = {
    Text: text,
    sanad: finalSanad,
    source,
  };

  try {
    await connectToMongoDB();

    if (id) {
      await HTextModel.findByIdAndUpdate(id, payload);
      revalidatePath("/htext");
      console.log("HText updated successfully");
    } else {
      await HTextModel.create(payload);
      revalidatePath("/htext");
      console.log("HText created successfully");
    }
  } catch (error) {
    console.error("Error submitting HText:", error);
  }
}
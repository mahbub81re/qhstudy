"use server";

import { connectToMongoDB } from "@/utils/mongoConnection";
import translationsModel from "@/models/translations";
import { revalidatePath } from "next/cache";

interface TranslationData {
  translationText: string;
  language: string;
  translator_name?: string;
  type: string;
  textId: string;
  _id?: string;
}

export async function createOrUpdateTranslation(formData: FormData) {
  await connectToMongoDB();

  const data: TranslationData = {
    translationText: formData.get("translationText") as string,
    language: formData.get("language") as string,
    translator_name: formData.get("translator_name") as string || undefined,
    type: formData.get("type") as string,
    textId: formData.get("textId") as string,
    _id: formData.get("_id") as string || undefined,
  };

  // Basic validation
  if (!data.translationText || !data.language || !data.type || !data.textId) {
    return { success: false, message: "Missing required fields." };
  }

  try {
    if (data._id) {
      await translationsModel.findByIdAndUpdate(data._id, {
        translationText: data.translationText,
        language: data.language,
        translator_name: data.translator_name,
        type: data.type,
      });
      return { success: true, message: "Translation updated successfully." };
    } else {
      await translationsModel.create(data);
      return { success: true, message: "Translation created successfully." };
    }
  } catch (error) {
    console.error("Error in createOrUpdateTranslation:", error);
    return { success: false, message: "Failed to save translation." };
  }
}

export async function getTrans(id: string, tab: string) {
  await connectToMongoDB();
    const docs = await translationsModel
      .find({ textId: id, type: tab })
      .sort({ createdAt: -1 });
    return docs;
   
}

export async function getInfoForEdit(edit: string) {
  await connectToMongoDB();
  try {
    const doc = await translationsModel.findById(edit);
    return doc;
  } catch (error) {
    console.error("Error in getInfoForEdit:", error);
    return { success: false, message: "Failed to retrieve translation for edit." };
  }
}

export async function deleteTrans(id: string) {
  await connectToMongoDB();
  try {
    const deleted = await translationsModel.findByIdAndDelete(id);
    return { success: true, deleted };
  } catch (error) {
    console.error("Error in deleteTrans:", error);
    return { success: false, message: "Failed to delete translation." };
  }
}


export async function handleDelete(formData: FormData) {
    "use server";
    const transId = formData.get("tsid") as string;
    const id = formData.get("id") as string;
    const tab = formData.get("tab") as string;
    if (!transId) return;
    await deleteTrans(transId);
    revalidatePath(`/admin/h-text/${id}?tab=${tab}#details`);
  }
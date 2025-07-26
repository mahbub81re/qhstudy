import { createOrUpdateTranslation } from "@/actions/translationActions";
import { revalidatePath } from "next/cache";
import Link from "next/link";

interface Translation {
  _id?: string;
  translationText: string;
  translator_name?: string;
  language?: string;
  type?: string;
  createdAt?: Date;
}

export default function TranslationForm({
  textId,
  tab,
  infoForEdit,
}: {
  textId: string;
  tab: string;
  infoForEdit?: Translation;
}) {

  async function handleSubmit(formData: FormData) {
    "use server";
    await createOrUpdateTranslation(formData);

    // Revalidate to refresh data
    revalidatePath(`/admin/h-text/${textId}?tab=${tab}#details`);
  }

  return (
    <form
      action={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-4 transition-all duration-300 hover:shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        {infoForEdit ? "Update Translation" : "Add Translation"}
      </h3>

      {/* Hidden Fields */}
      <input type="hidden" name="textId" value={textId} />
      {infoForEdit?._id && <input type="hidden" name="_id" value={infoForEdit._id} />}

      {/* Translation Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Translation Text
        </label>
        <textarea
          name="translationText"
          required
          defaultValue={infoForEdit?.translationText || ""}
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-green-300 focus:border-green-500"
          placeholder="Enter translation text"
        ></textarea>
      </div>

      {/* Language & Translator */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <input
            type="text"
            name="language"
            defaultValue={infoForEdit?.language || "bn"}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-green-300 focus:border-green-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Translator Name
          </label>
          <input
            type="text"
            name="translator_name"
            defaultValue={infoForEdit?.translator_name || ""}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-green-300 focus:border-green-500"
            placeholder="Translator Name"
          />
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-green-300 focus:border-green-500"
          defaultValue={infoForEdit?.type || tab}
        >
          <option value="translation">Translation</option>
          <option value="explanation">Explanation</option>
          <option value="discussion">Discussion</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {infoForEdit ? "Update Translation" : "Save Translation"}
        </button>

        {infoForEdit && (
          <Link
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            href={`/admin/h-text/${textId}?tab=${tab}#details`}
          >
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}

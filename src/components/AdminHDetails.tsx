import Link from "next/link";
import TranslationForm from "./TranslationForm";
import { deleteTrans, getInfoForEdit, getTrans, handleDelete } from "@/actions/translationActions";
import { revalidatePath } from "next/cache";

interface Translation {
  _id: string;
  translationText: string;
  translator_name: string;
  language: string;
  createdAt: Date;
}

export default async function AdminHDetails({
  id,
  tab = "translation",
  edit,
}: {
  id: string;
  tab?: string;
  edit?: string;
}) {
  
  const translations:Translation[] | [] =await getTrans(id, tab);

  const infoForEdit: Translation | null = edit ? await getInfoForEdit(edit) : null;



  return (
    <div className="w-full flex flex-col space-y-4 my-4" id="details">
      {/* Tabs */}
      <div className="w-full bg-white shadow-md rounded-lg p-4">
        <ul className="flex flex-row items-center justify-around">
          {["translation", "explanation", "discussion"].map((t) => (
            <li
              key={t}
              className={`text-gray-600 ${tab === t ? "font-bold text-green-600" : ""}`}
            >
              <Link href={`/admin/h-text/${id}?tab=${t}#details`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Translations List */}
      <div className="w-full bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2 capitalize">{tab}</h2>
        <ul className="space-y-4">

          {!translations ? (
                <li className="text-red-500">Failed to fetch {tab}.</li>
              ) : translations.length > 0 ? (
                translations.map((translation) => (
                            <li
                              key={translation._id.toString()}
                              className="border-b pb-3 flex flex-col md:flex-row md:items-center md:justify-between"
                            >
                              <div>
                                <p className="text-gray-800">{translation.translationText}</p>
                                <p className="text-sm text-gray-500">
                                  Translator: {translation.translator_name || "Anonymous"} •
                                  Language: {translation.language || "Unknown"}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 mt-2 md:mt-0">
                                <Link
                                  href={`/admin/h-text/${id}?tab=${tab}&edit=${translation._id.toString()}#details`}
                                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                  Edit
                                </Link>
                                <form action={handleDelete}>
                                  <input type="hidden" name="tsid" value={translation._id.toString()} />
                                  <input type="hidden" name="id" value={id} />
                                  <input type="hidden" name="tab" value={tab} />
                                  <button
                                    type="submit"
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                  >
                                    Delete
                                  </button>
                                </form>
                              </div>
                            </li>
                          ))
              ) : (
                <li className="text-gray-500">No {tab} found.</li>
              )}

        
        </ul>
      </div>

      {/* Add / Edit Form */}
      <TranslationForm textId={id} tab={tab} infoForEdit={infoForEdit || undefined} />
    </div>
  );
}

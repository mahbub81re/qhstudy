import { revalidatePath } from "next/cache";
import { createHText, updateHText } from "@/actions/h-text-action";
export default function HTextUpdate({
  htext,
}: {
  htext: {
    _id?: string;
    Text?: string;
    sanad?: Array<{
      type?: string;
      text?: string;
    }>;
    source?: string;
  } | null;
}) {


  async function submitForm(formData: FormData) {
    "use server";
    if (htext?._id) {
      await updateHText(formData, htext._id);
    } else {
      alert("HText ID is missing");
      return;
    }

    revalidatePath("/admin/h-text");
  } 


  return (
    <form
      action={submitForm}
      className="mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {htext?._id ? "Update HText" : "Submit HText"}
      </h2>

      {/* Text Field */}
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          defaultValue={htext?.Text || ""}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Enter main text"
        />
      </div>

      <div className="grid grid-cols-1  gap-4">
       {htext?.sanad && htext.sanad.length > 0 && htext.sanad.map((s, index) => (
        <div key={index} className="space-y-4 gap-2 flex " >   
           <div className="flex-1">
           {index ===0 && <label htmlFor={`sanad_type_${index}`} className="block text-sm font-medium text-gray-700">
                Sanad Type
            </label>} 
            <input
                id={`sanad_type_${index}`}
                name="sanad_type"
                type="text"
                defaultValue={s.type || ""}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Chain, Reference"
            />
            </div>
            <div className="flex-1">
            {index === 0 && <label htmlFor={`sanad_${index}`} className="block text-sm font-medium text-gray-700">
                Sanad Text
            </label>}
            <input
                id={`sanad_${index}`}
                name="sanad"
                type="text"
                defaultValue={s.text || ""}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Narrated by..."
            />  
            </div>
        </div>
      ))}

      <div className="flex gap-2">
        <div className="flex-1">
      
        <input
            id="sanad_type"
            name="sanad_type"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Chain, Reference"
          />
          </div>
        <div className="flex-1">
          <input
            id="sanad"
            name="sanad"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Narrated by..."
          />
          </div>
        </div>
      </div>

      {/* Source Field */}
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          Source
        </label>
        <input
          id="source"
          name="source"
          type="text"
          defaultValue={htext?.source || ""}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Book, page number, etc."
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {htext?._id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

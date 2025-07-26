import { createHText } from "@/actions/h-text-action";

export default function HTextFormClient() {
  return (
    <form
      action={createHText}
      className=" mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Submit HText</h2>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Text
        </label>
        <input
          id="text"
          name="text"
          type="text"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Enter main text"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sanad_type" className="block text-sm font-medium text-gray-700">
            Sanad Type
          </label>
          <input
            id="sanad_type"
            name="sanad_type"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Chain, Reference"
          />
        </div>

        <div>
          <label htmlFor="sanad" className="block text-sm font-medium text-gray-700">
            Sanad Text
          </label>
          <input
            id="sanad"
            name="sanad"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. Narrated by..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          Source
        </label>
        <input
          id="source"
          name="source"
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Book, page number, etc."
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

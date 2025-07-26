import HadithFilter from "@/components/HadithFilter";
import HTextFormClient from "@/components/HTextFormClient";


export default function HTextForm() {
  return (
    <div className=" p-4 min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
        <HTextFormClient/>
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Latest Hadith</h1>
        <div className="w-full bg-white shadow-md rounded-lg p-4">
           <HadithFilter />
          </div>

      </div>
    </div>
  );
}

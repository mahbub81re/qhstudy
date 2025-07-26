"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Hadith {
  _id: string;
  Text: string;
  category?: string;
}

export default function HadithFilterClient() {
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [filtered, setFiltered] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [hadithId, setHadithId] = useState("");
  const [limit, setLimit] = useState(10);

  // Fetch all hadiths on mount
  useEffect(() => {
    async function fetchHadiths() {
      setLoading(true);
      try {
        const res = await fetch("/api/hadith"); // Create this API route
        const data = await res.json();
        setHadiths(data);
        setFiltered(data.slice(0, limit));
      } catch (error) {
        console.error("Error fetching hadith:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHadiths();
  }, [limit]);

  // Apply filtering
  const applyFilter = () => {
    let result = [...hadiths];
    if (keyword) {
      result = result.filter((h) =>
        h.Text.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    if (category) {
      result = result.filter((h) => h.category === category);
    }
    if (hadithId) {
      result = result.filter((h) => h._id.includes(hadithId));
    }
    setFiltered(result.slice(0, limit));
  };

  const resetFilter = () => {
    setKeyword("");
    setCategory("");
    setHadithId("");
    setFiltered(hadiths.slice(0, limit));
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Filter Hadith</h2>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Category</option>
          <option value="sahih">Sahih</option>
          <option value="daif">Daif</option>
          <option value="hasan">Hasan</option>
        </select>
        <input
          type="text"
          placeholder="Hadith ID"
          value={hadithId}
          onChange={(e) => setHadithId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-2">
          <button
            onClick={applyFilter}
            className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Apply
          </button>
          <button
            onClick={resetFilter}
            className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Search Results</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filtered.length > 0 ? (
          <div className="mt-4 grid gap-4">
            {filtered.map((hadith) => (
              <div
                key={hadith._id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <h4 className="text-md font-bold text-green-700">
                  {hadith.category || "General"}
                </h4>
                <p className="text-gray-700 mt-2">{hadith.Text}</p>
                <Link
                  href={`/admin/h-text/${hadith._id}?tab=discussion`}
                  className="inline-block mt-3 text-green-600 hover:underline font-medium"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No hadith found.</p>
        )}
      </div>
    </div>
  );
}

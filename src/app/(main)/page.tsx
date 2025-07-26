import Calender from "@/components/Calendar";


export default function HomePage() {
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      

    <Calender/>
      <section className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
            <h3 className="text-green-700 text-lg font-semibold mb-2">
              Quran Ayat
            </h3>
            <p className="text-right text-gray-900 text-lg font-arabic mb-2">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-gray-700 text-sm mb-1">
              **Bangla:** পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।
            </p>
            <p className="text-gray-600 text-xs">
              **English:** In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
            <h3 className="text-green-700 text-lg font-semibold mb-2">
              Hadith
            </h3>
            <p className="text-right text-gray-900 text-lg font-arabic mb-2">
              إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
            </p>
            <p className="text-gray-700 text-sm mb-1">
              **Bangla:** কাজের ফলাফল নিয়তের উপর নির্ভর করে।
            </p>
            <p className="text-gray-600 text-xs">
              **English:** Actions are judged by intentions.
            </p>
          </div>
        </div>
      </section>
    
    </main>
  );
}

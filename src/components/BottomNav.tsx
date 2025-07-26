import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-around items-center">
      <Link href="/" className="text-gray-700 hover:text-green-700">   
      <div>Home</div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7m-7 7l7 7m-7-7h18m-9 9v-6a3 3 0 00-3-3H5a2 2 0 00-2 2v6a2 2 0 002 2h6a3 3 0 003-3z"
          />
        </svg>
      </div>
      </Link>
      <Link href="/calendar" className="text-gray-700 hover:text-green-700">Calendar</Link>
      <Link href="/hadith" className="text-gray-700 hover:text-green-700">Hadith</Link>
      <Link href="/quran" className="text-gray-700 hover:text-green-   700">Quran</Link>
      <Link href="/settings" className="text-gray-700 hover:text-green-700">Settings</Link>
      
    </nav>  
  );
}
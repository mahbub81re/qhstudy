"use client";
import { useEffect, useState } from "react";
import moment from "moment-hijri";
import React from "react";

export default function Calender() {
  const [dates, setDates] = useState({
    english: "",
    bangla: "",
    hijri: "",
  });

  useEffect(() => {
    const today = new Date();

    const englishDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const banglaDate = today.toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const hijriDate = moment(today).format("iD iMMMM iYYYY");

    setDates({ english: englishDate, bangla: banglaDate, hijri: hijriDate });
  }, []);

  return (
    <main className=" p-4 md:p-8">
  
      <section className="bg-white rounded-2xl shadow-lg p-4 md:p-6 max-w-2xl mx-auto mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Today’s Calendar
        </h2>
        <div className="flex flex-col space-y-3 text-center text-gray-700">
          <p>
            <span className="font-bold">English: </span>
            {dates.english}
          </p>
          <p>
            <span className="font-bold">Bangla: </span>
            {dates.bangla}
          </p>
          <p>
            <span className="font-bold">Hijri: </span>
            {dates.hijri}
          </p>
        </div>
      </section>

    </main>
  );
}   

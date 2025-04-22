import React, { useEffect, useState } from "react";
// import { getEntriesFromStorage } from "../utils/localstorage";
import { FaCloudSun, FaCloud, FaSun } from "react-icons/fa";
import Header from "../components/Header";

const weatherIcon = (weather) => {
  switch (weather) {
    case "sunny":
      return <FaSun className="text-yellow-500" />;
    case "cloudy":
      return <FaCloud className="text-gray-500" />;
    case "partly-cloudy":
    default:
      return <FaCloudSun className="text-orange-400" />;
  }
};

const AllEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("moodEntries");
    const parsed = data ? JSON.parse(data) : [];
    setEntries(parsed.reverse()); // Show most recent entries first
  }, []);
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-pink-200 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-white px-6 py-2 rounded-xl shadow">
        All Notes
      </h2>

      <div className="grid md:grid-cols-2 gap-4 w-full max-w-4xl">
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center w-full col-span-2">
            No entries saved yet.
          </p>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center text-2xl mb-2">
                <span className="mr-2">{entry.mood}</span>
                <p className="text-base text-gray-800 font-medium">{entry.note}</p>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <p>{entry.date}</p>
                <div className="flex items-center gap-1">
                  {weatherIcon(entry.weatherType)}
                  <span>{entry.temp}°C</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default AllEntries;

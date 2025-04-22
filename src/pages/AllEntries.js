import React, { useEffect, useState } from "react";
import { FaCloudSun, FaCloud, FaSun } from "react-icons/fa";
import Header from "../components/Header";
import { format } from 'date-fns'; // Added date-fns for formatting

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
  let theme = localStorage.getItem("theme") || "light";
  
  useEffect(() => {
    if (theme === "light") {
      document.body.className = "bg-gradient-to-br from-orange-200 to-pink-200 text-black";
    } else if (theme === "dark") {
      document.body.className = "bg-gray-900 text-white";
    }
  }, [theme]);

  useEffect(() => {
    const data = localStorage.getItem("moodEntries");
    const parsed = data ? JSON.parse(data) : [];
    
    // Error handling if the parsed data is not an array
    if (!Array.isArray(parsed)) {
      console.error("Invalid data format in localStorage");
      setEntries([]);
      return;
    }
    
    setEntries(parsed.reverse()); // Show most recent entries first
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-white px-6 py-2 rounded-xl shadow">
          All Notes
        </h2>

        {/* Export Button */}
        <button
          className="inline-flex items-center border-2 py-1 px-3 focus:outline-none hover:text-red-500 rounded text-base mt-4 md:mt-0 ml-auto"
          onClick={() => { alert("Thank you for showing your interest! This is coming soon!!") }}
        >
          Export
        </button>

        {/* If no entries */}
        {entries.length === 0 ? (
          <div className="text-gray-500 text-center w-full col-span-2">
            <p>No entries saved yet.</p>
            <button
              className="mt-4 p-2 bg-orange-500 text-white rounded-full"
              onClick={() => window.location.href = "/home"} // Redirect to home to add an entry
            >
              Add your first mood entry!
            </button>
          </div>
        ) : (
          // Display Entries
          <div className="grid md:grid-cols-2 gap-4 w-full max-w-4xl">
            {entries.map((entry, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center text-2xl mb-2">
                  <span className="mr-2">{entry.mood}</span>
                  <p className="text-base text-gray-800 font-medium">{entry.note}</p>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <p>{format(new Date(entry.date), 'MMM dd, yyyy')}</p> {/* Formatted date */}
                  <div className="flex items-center gap-1">
                    {weatherIcon(entry.weatherType)}
                    <span>{entry.temp}°C</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllEntries;

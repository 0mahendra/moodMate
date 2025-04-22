import React, { useEffect } from 'react';
const EntryList = ({ entries }) => {
    let theme = localStorage.getItem("theme") || "light";
    useEffect(() => {
                if (theme === "light") {
                  document.body.className = "bg-white text-black";
                } else if (theme === "dark") {
                  document.body.className = "bg-gray-900 text-white";
                }
              }, [theme]);
    if (entries.length === 0) {
      return <p className="text-center text-gray-500">No entries yet.</p>;
    }
  
    return (
      <div className="grid gap-4">
        {entries.map((entry, index) => (
          <div key={index} className="bg-white shadow p-4 rounded-xl border">
            <div className="flex justify-between">
              <span className="font-bold">{entry.date}</span>
              <span className="text-2xl">{entry.mood}</span>
            </div>
            <p className="mt-2 text-gray-700">{entry.note || 'No notes.'}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default EntryList;
  
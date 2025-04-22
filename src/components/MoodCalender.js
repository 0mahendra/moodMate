import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Base styles
import './tailwind-calendar.css'; // We'll override styles here
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const moodColors = {
  happy: 'bg-yellow-400',
  sad: 'bg-blue-500',
  angry: 'bg-red-400',
  calm: 'bg-green-500',
};

const MoodCalendar = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date());
  const [emojiMap, setEmojiMap] = useState({});
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Set theme class based on localStorage
  let theme = localStorage.getItem("theme") || "light";
  useEffect(() => {
    if (theme === "light") {
      document.body.className = "bg-white text-black";
    } else if (theme === "dark") {
      document.body.className = "bg-gray-900 text-white";
    }
  }, [theme]);

  // Load mood entries from local storage and set emoji map
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodEntries")) || [];
    const map = {};
    stored.forEach((entry) => {
      map[entry.date] = entry.moodColor;
    });
    setEmojiMap(map);
  }, []);

  const handleChange = (date) => {
    setValue(date);
    onDateSelect(date);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-[#fff7f0] rounded-xl shadow p-4 w-fit mx-auto relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          📅 {value.toLocaleString("default", { month: "long" })}
        </h2>
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setShowMonthPicker(!showMonthPicker)}
        >
          🗓️
        </button>
        {showMonthPicker && (
          <div className="absolute z-50 mt-2">
            <DatePicker
              selected={value}
              onChange={(date) => {
                setValue(date);
                setShowMonthPicker(false);
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline
            />
          </div>
        )}
      </div>
      <Calendar
        onChange={handleChange}
        value={value}
        prevLabel={null}
        nextLabel={null}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          const dateStr = formatDate(date);
          const mood = emojiMap[dateStr];
          return view === "month" && mood ? (
            <div className={`w-2 h-2 mt-1 mx-auto rounded-full ${moodColors[mood]}`}></div>
          ) : null;
        }}
        tileClassName="!h-12 text-sm relative hover:bg-gray-100 rounded-xl transition-all duration-200"
      />
      
      <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-700">
        <Legend color="bg-red-400" label="Angry" />
        <Legend color="bg-yellow-400" label="Happy" />
        <Legend color="bg-blue-500" label="Sad" />
        <Legend color="bg-green-500" label="Calm" />
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-1">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    {label}
  </div>
);

export default MoodCalendar;

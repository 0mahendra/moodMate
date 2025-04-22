import React, { useEffect, useState } from "react";

const moods = ['😊', '😐', '😔', '😡', '🥳'];

const EntryForm = ({ onSave, selectedDate, weather }) => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString() : "";
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    if (theme === "light") {
      document.body.className = "bg-white text-black";
    } else if (theme === "dark") {
      document.body.className = "bg-gray-900 text-white";
    }
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood || !selectedDate) return alert("Please select mood and date");

    let moodColor = "";
    switch (mood) {
      case '😊':
        moodColor = 'happy';
        break;
      case '😐':
        moodColor = 'calm';
        break;
      case '😔':
        moodColor = 'sad';
        break;
      case '😡':
        moodColor = 'angry';
        break;
      case '🥳':
        moodColor = 'happy';
        break;
      default:
        moodColor = 'happy';
        break;
    }

    const entry = {
      date: formattedDate,
      mood,
      moodColor,
      note,
      temp: weather.temp, // Dummy weather data
      weatherType: "sunny", // Dummy weather type
    };

    onSave(entry);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mt-4">
      <p className="font-semibold text-lg mb-2 text-orange-500">How are you feeling on {formattedDate}?</p>
      <div className="flex gap-2 mb-3">
        {moods.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMood(m)}
            className={`text-2xl px-2 py-1 rounded-full ${
              mood === m ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Add a note..."
        className="w-full border rounded p-2 mb-3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Save
      </button>
    </form>
  );
};

export default EntryForm;

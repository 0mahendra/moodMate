import React from 'react';
import { useState } from 'react';

const moods = ['😊', '😐', '😔', '😡', '🥳'];

const EntryForm = ({ onSave ,selectedDate , weather}) => {
//   const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString()
    : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood || !selectedDate) return alert("Please select mood and date");
    // const entry = { date, mood, note };
    let moodColor ="";

    if(mood === '😊'){
     moodColor ='happy';
    }else if(mood === '😐'){
      moodColor ='calm';
    }else if(mood === '😔') {
        moodColor ='sad';   
    }else if(mood === '😡'){
        moodColor ='angry';
    }else if(mood === '🥳'){
        moodColor ='happy';
    }else{  
        moodColor ='happy';
    }   
    const entry = {
        date: formattedDate,
        mood,
        moodColor,
        note,
        temp: weather.temp, // dummy weather
        weatherType: "sunny"
      };
  
    onSave(entry);
    setNote('');
  };

  return (
    // <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow mt-4">
      

    //   <div>
    //     <label className="block font-semibold">Mood</label>
    //     <div className="flex gap-2">
    //       {moods.map((m) => (
    //         <button
    //           key={m}
    //           type="button"
    //           onClick={() => setMood(m)}
    //           className={`text-2xl px-3 py-1 rounded ${
    //             mood === m ? 'bg-blue-500 text-white' : 'bg-gray-100'
    //           }`}
    //         >
    //           {m}
    //         </button>
    //       ))}
    //     </div>
    //   </div>

    //   <div>
    //     <label className="block font-semibold">Notes</label>
    //     <textarea
    //       rows="2"
    //       className="border p-2 rounded w-full"
    //       placeholder="Write something..."
    //       value={note}
    //       onChange={(e) => setNote(e.target.value)}
    //     ></textarea>
    //   </div>

    //   <button
    //     type="submit"
    //     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //   >
    //     Save Entry
    //   </button>
    // </form>
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mt-4">
      <p className="font-semibold text-lg mb-2">How are you feeling on {formattedDate}?</p>
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
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default EntryForm;

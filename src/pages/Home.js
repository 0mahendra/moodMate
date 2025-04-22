import React, { useEffect, useState } from "react";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import MoodCalendar from "../components/MoodCalender";
import Weather from "../components/Weather";
import { saveEntry } from "../utils/localStorage";
import Header from "../components/Header";

const getBackgroundClass = (temp, hour) => {
  if (hour >= 6 && hour < 12) {
    if (temp < 20) return "from-blue-100 to-blue-300";
    if (temp < 30) return "from-yellow-100 to-yellow-300";
    return "from-yellow-300 to-orange-400";
  } else if (hour >= 12 && hour < 18) {
    if (temp < 25) return "from-blue-200 to-green-200";
    return "from-orange-300 to-red-500";
  } else {
    return "from-gray-400 to-gray-600";
  }
};

const Home = () => {
  const [temp, setTemp] = useState(null);
  const [weather , setWeather] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);


  const handleSave = (entry) => {
    saveEntry(entry);
    alert('Mood saved!');
  };
  const hour = new Date().getHours();
  const gradient = temp !== null ? getBackgroundClass(temp, hour) : "from-orange-200 to-yellow-100";

  return (
    <>
    <div className={`bg-gradient-to-br ${gradient}`}>
    <Header/>
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${gradient} p-2 transition-all duration-500`}>
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-700">MoodMate</h1>
         { selectedDate && <div className="text-orange-600 text-sm font-semibold">
            <Weather setTemp={setTemp} setWea = {setWeather} />
          </div>}
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex-1 w-full align-center ">
            {selectedDate && <EntryForm onSave={handleSave} selectedDate={selectedDate} weather />}
            {!selectedDate && <div className="text-orange-600 text-sm font-semibold mt-[7.5rem]">
            <Weather setTemp={setTemp} setWea = {setWeather} />
          </div> }
          </div>
          <div className="flex-1 w-full">
            <MoodCalendar  onDateSelect={setSelectedDate} />
           
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Home;



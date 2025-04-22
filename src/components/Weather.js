import { useEffect, useState } from 'react';

const Weather = ({ setTemp, setWeatherData }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(localStorage.getItem('user-city') || '');
  const [inputCity, setInputCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(!city);
  const [icon, setIcon] = useState(null);
  let theme = localStorage.getItem("theme") || "light";
  useEffect(() => {
          
              if (theme === "light") {
                document.body.className = "bg-white text-black";
              } else if (theme === "dark") {
                document.body.className = "bg-gray-900 text-white";
              }
            }, [theme]);
  const fetchWeatherByCity = async (cityName) => {
    if (!cityName.trim()) return;

    try {
      setLoading(true);
      
     
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=c2da22f7e0feefd96ba4d5d7466afd89`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("City not found");
      }
      
      const data = await response.json();
      
     
      setWeather(data);
      setCity(data.name);
      localStorage.setItem('user-city', data.name);
      setShowInput(false);
      
   
      if (setTemp) setTemp(data.main.temp);
      if (setWeatherData) setWeatherData(data);
      
      // Determine day or night based on sunrise and sunset times
      const currentTime = new Date().getTime() / 1000; // Current time in seconds
      const isDayTime = currentTime > data.sys.sunrise && currentTime < data.sys.sunset;
      
   
      const condition = data.weather[0].main;
      
      if (condition === "Clouds") {
        setIcon(isDayTime
          ? <i className="fas fa-cloud text-gray-400"></i>
          : <i className="fas fa-cloud text-gray-300"></i>);
      } else if (condition === "Clear") {
        setIcon(isDayTime
          ? <i className="fas fa-sun text-yellow-400"></i>
          : <i className="fas fa-moon text-indigo-400"></i>);
      } else if (condition === "Rain") {
        setIcon(isDayTime
          ? <i className="fas fa-cloud-showers-heavy text-blue-500"></i>
          : <i className="fas fa-cloud-moon-rain text-blue-300"></i>);
      } else if (condition === "Snow") {
        setIcon(isDayTime
          ? <i className="fas fa-snowflake text-blue-300"></i>
          : <i className="fas fa-snowflake text-white"></i>);
      } else {
        setIcon(isDayTime
          ? <i className="fas fa-sun text-orange-500"></i>
          : <i className="fas fa-moon text-blue-400"></i>);
      }
    } catch (err) {
      alert("Error fetching weather: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) {
      fetchWeatherByCity(city);
    }
  }, []);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      fetchWeatherByCity(inputCity);
      setInputCity('');
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h2 className="text-3xl font-semibold mb-2 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        Weather {city && `in ${city}`}
      </h2>

      {showInput ? (
        <form onSubmit={handleCitySubmit} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Enter city name"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="mb-4 text-blue-600 underline text-sm"
        >
          Change City
        </button>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div className="flex justify-between">
          <div>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Wind: {weather.wind.speed} km/h</p>
          </div>
          <div>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p>Enter a city to see weather data.</p>
      )}
    </div>
  );
};

export default Weather;
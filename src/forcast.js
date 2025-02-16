import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setError("");
      })
      .catch(() => {
        setWeather("");
        setQuery("");
        setError("City not found");
      });
  };

  useEffect(() => {
    search("Bengaluru");
    const interval = setInterval(() => search("Bengaluru"), 600000); // Auto refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast-container">
      <div className="forecast">
        <div className="forecast-icon">
          <ReactAnimatedWeather
            icon={weather.weather ? weather.weather[0].main.toUpperCase() : "CLEAR_DAY"}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
        <div className="today-weather">
          <h3>{weather.name ? `${weather.name}, ${weather.sys.country}` : "Weather App"}</h3>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search any city"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button onClick={() => search(query)}>🔍</button>
          </div>
          {weather.main ? (
            <ul>
              <li>
                Temperature: <span>{Math.round(weather.main.temp)}°C ({weather.weather[0].main})</span>
              </li>
              <li>
                Humidity: <span>{weather.main.humidity}%</span>
              </li>
              <li>
                Visibility: <span>{weather.visibility / 1000} km</span>
              </li>
              <li>
                Wind Speed: <span>{Math.round(weather.wind.speed)} km/h</span>
              </li>
              <li>
                Sunrise: <span>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span>
              </li>
              <li>
                Sunset: <span>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span>
              </li>
            </ul>
          ) : (
            <p className="error-message">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forecast;

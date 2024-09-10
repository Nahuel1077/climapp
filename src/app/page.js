"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; 

export default function Home() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); 
  const [isSunny, setIsSunny] = useState(true); 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://www.meteosource.com/api/v1/free/find_places?text=${query}&language=en&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const placeId = data[0].place_id;
      const urlLocation = `https://www.meteosource.com/api/v1/free/point?place_id=${placeId}&sections=current%2Chourly&language=en&units=auto&key=${apiKey}`;
      const weatherResponse = await fetch(urlLocation);
      const weatherData = await weatherResponse.json();

      setWeather(weatherData.current);

      if (data[0].country === "United States of America") {
        setIsCelsius(false); 
      } else {
        setIsCelsius(true);
      }

      if (weatherData.current.cloud_cover >= 50) {
        setIsSunny(false); 
      } else {
        setIsSunny(true);
      }

    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="layout">
      <div className="base">
        <form onSubmit={handleSubmit} id="form">
          <input type="text" value={query} onChange={handleInputChange} placeholder="Localización" />
          <button type="submit">Buscar</button>
        </form>
        <ul>
          <li>
            {weather && (
              <div id="result">
                <h2 id="temp">
                  Temperatura actual: {weather.temperature}
                  {isCelsius ? <span>°C</span> : <span>°F</span>}
                </h2>
                <span id="error">No se encontraron resultados.</span>
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="img" id="imgContainer" style={{ display: 'flex' }}>
        {!isSunny ? (
          <Image src="/cloudy.svg" width={300} height={300} alt="cloudy" />
        ) : (
          <Image src="/sunny.svg" width={300} height={300} alt="sunny" />
        )}
      </div>
    </div>
  );
}

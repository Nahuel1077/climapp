"use client";
import { useState } from "react";
import Image from "next/image"; 


export default function Home(){
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const C = document.getElementById("C");
  const F = document.getElementById("F");
  const imgCloudy = document.getElementById("imgCloudy");
  const imgSunny = document.getElementById("imgSunny");
  const imgContainer = document.getElementById("imgContainer");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://www.meteosource.com/api/v1/free/find_places?text=${query}&language=en&key=${apiKey}`

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      console.log(data);
      const placeId = data[0].place_id;
      const urlLocation = `https://www.meteosource.com/api/v1/free/point?place_id=${placeId}&sections=current%2Chourly&language=en&units=auto&key=${apiKey}`;
      const weatherResponse = await fetch(urlLocation);
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      console.log(data[0].country);
      setWeather(weatherData.current);
      
      if(data[0].country == "United States of America"){
        F.style.display = "block";
        C.style.display = "none";
      } else{
        C.style.display = "block";
        F.style.display = "none";
      };

      if(weatherData.current.cloud_cover >= 50){
        imgSunny.style.display = "none";
        imgCloudy.style.display = "block";
        imgContainer.style.display = "flex";
      } else{
        imgSunny.style.display = "block";
        imgCloudy.style.display = "none";
        imgContainer.style.display = "flex";
      }

    } catch (error) {
      console.error("Error fetching data", error);
    }
    
        };

  return(
    <div className="layout">
      <div className="base">
        <form onSubmit={handleSubmit} id="form">
          <input type="text" value={query} onChange={handleInputChange} placeholder="Localización"/>
          <button type="submit">Buscar</button> 
        </form>
        <ul>
            <li>
              {weather && (
                  <div id="result">
                    <h2 id="temp">
                      Temperatura actual: {weather.temperature}
                      <span id="C">°C</span>
                      <span id="F">°F</span>
                      </h2>
                      <span id="error">No se encontraron resultados.</span>
                  </div>
                )}
            </li>
        </ul>
      </div>
      <div className="img" id="imgContainer">
        <Image src="/cloudy.svg" id="imgCloudy" width="300" height="300" alt="cloudy"/>
        <Image src="sunny.svg" id="imgSunny" width="300" height="300" alt="sunny"/>
      </div>
    </div>
  )
}
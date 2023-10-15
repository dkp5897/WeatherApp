import React, { useState } from "react";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(cloud);

  const api_key = "20e7a991e8626ea981a8c9537ed653ec";

  const search = async () => {
    if (city === "") {
      return;
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
    );

    const data = await res.json();

    const temprature = document.getElementsByClassName("temprature");
    const humidity = document.getElementsByClassName("humidity");
    const loaction = document.getElementsByClassName("city");
    const wind_speed = document.getElementsByClassName("wind-speed");

    temprature[0].innerHTML = data.main.temp + " °c";
    humidity[0].innerHTML = data.main.humidity + " %";
    loaction[0].innerHTML = data.name;
    wind_speed[0].innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].icon === "01n" || data.weather[0].icon === "01d") {
      setWeatherIcon(clear);
    } else if (
      data.weather[0].icon === "02n" ||
      data.weather[0].icon === "02d"
    ) {
      setWeatherIcon(cloud);
    } else if (
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWeatherIcon(drizzle);
    } else if (
      data.weather[0].icon === "09n" ||
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWeatherIcon(rain);
    } else if (
      data.weather[0].icon === "13n" ||
      data.weather[0].icon === "13d"
    ) {
      setWeatherIcon(snow);
    }else{
        setWeatherIcon(clear)
    }

    setCity("")
  };

  return (
    <div className="container">
      <div className="topbar">
        <input
          type="text"
          className="searchbar"
          placeholder="Search city"
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="searchIcon" onClick={() => search()}>
          <img src={search_icon} alt="seatch" className="reach-icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="" className="weath-img" />
      </div>
      <div className="temprature">20 °c</div>
      <div className="city">London</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity">70 %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="wind-speed">20 km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

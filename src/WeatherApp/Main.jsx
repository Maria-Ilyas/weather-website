import React, { useState } from 'react';
import axios from 'axios';
import "./weather.css";

const Main = () => {
    const [city, setCity] = useState({});
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(true);
    const recent = new Date().toLocaleTimeString();
    const [time, setTime] = useState(recent);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=06f74418591f67329694c236d2817d98`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setCity(response.data)
                setShow(false);
            })
            setSearch('')
        }
    }

    const getTime = () => {
        setTime(new Date().toLocaleTimeString());
    }
    setInterval(getTime, 1000);

    return (
        <>
            <div className='weather_div'> <br />
                <div className='secondDiv'>
                    <h3>Weather Forecast</h3>
                    <div className='inputDiv'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="search" value={search} placeholder='Search a city'
                            onKeyPress={searchLocation}
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }} />
                    </div>
                    <p className='para'>After write the  city name, press Enter</p>
                    <div className='flexDiv'>
                        <div>
                            {city.main ? (
                                <>
                                    <h1><i className="fa-solid fa-cloud"></i> {city.main.temp}°C</h1>
                                    <h2><i className="fa-solid fa-location-dot"></i> {city.name}</h2>
                                    <p>{time} | min-temp: {city.main.temp_min}°C | max-temp: {city.main.temp_max}°C</p>
                                </>
                            ) : null}
                        </div>
                        {show ? null : (<>
                            <div className='fiveDiv'>
                                <p>Description</p>
                                <hr />
                                <div className='forecast'>
                                    <div className='mon'>
                                        {city.main ? (
                                            <>
                                                <p>Humidity: {city.main.humidity}%</p>
                                                <p>Feels_like: {city.main.feels_like}°C</p>
                                            </>
                                        ) : null}
                                        {city.wind ? (
                                            <p>Wind Speed: {city.wind.speed} MPH</p>
                                        ) : null}
                                    </div>
                                    <div className='thurs'>
                                        <p>Visibility: {city.visibility} </p>
                                        {city.weather ? (
                                            <p>Condition: {city.weather[0].main}</p>
                                        ) : null}

                                    </div>
                                </div>

                            </div>
                        </>)}



                    </div>

                </div>
            </div>
        </>
    );
}

export default Main;

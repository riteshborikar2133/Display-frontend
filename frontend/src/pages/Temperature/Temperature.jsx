import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Temperature.css"

const Temperature = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch weather data from RapidAPI
        const fetchWeather = async (settemp) => {
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: { q: '48.8567,2.3508' }, // You can pass the city here
                headers: {
                    'X-RapidAPI-Key': '6ce665a4d6b84d5d271bd5b8c306f12c', // Replace with your API key
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };

            try {
                const API_key = '6ce665a4d6b84d5d271bd5b8c306f12c'
                const lat = '21.145800'
                const lon = '79.088158'
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
                if (response) {
                    console.log(response.data)
                    console.log(response.data.weather[0].main)
                    console.log((response.data.main.temp - 273.15))
                }
                setWeather(response.data)
                setLoading(false);
                // settemp(weather.main.temp)
            } catch (error) {
                setError('Error fetching weather data');
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);
    if (loading) return <div>Loading weather...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='weather-container'>
            {/* <h2>Weather in {weather?.location?.name}</h2> */}
            <p>Temperature: {Math.round(weather?.main.temp - 273)}°C</p>
            <p>Condition: {weather?.weather[0].main}</p>
            {/* <img src={weather?.current?.condition?.icon} alt="Weather Icon" /> */}

        </div>
    );
};

export default Temperature;

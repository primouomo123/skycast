import { useState } from 'react'
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveCurrentWeather() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    async function fetchCurrentWeather(lat, lon) {
        setWeatherData(null);
        setError(null);
        setLoading(true);
        try {
            if (lat == null || lon == null) {
                throw new Error('Latitude and longitude are required');
            }

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'imperial',
                    appid: apiKey
                }
            });

            setWeatherData(response.data);
        }
        
        catch (err) {
            setError(err.response?.data?.message || err.message);
        }
        
        finally {
            setLoading(false);
        }
    }

    return { weatherData, error, fetchCurrentWeather, loading };
}

export default useRetrieveCurrentWeather;
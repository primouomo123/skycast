import { useState } from 'react'
import axios from 'axios';

const fullWeatherEndpoint = import.meta.env.VITE_RETRIEVE_FULL_WEATHER_ENDPOINT;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveFullWeather() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    async function fetchFullWeather(lat, lon) {
        setWeatherData(null);
        setError(null);
        setLoading(true);
        try {
            if (lat == null || lon == null) {
                throw new Error('Latitude and longitude are required');
            }

            const response = await axios.get(fullWeatherEndpoint, {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'metric',
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

    return { weatherData, error, fetchFullWeather, loading };
}

export default useRetrieveFullWeather;
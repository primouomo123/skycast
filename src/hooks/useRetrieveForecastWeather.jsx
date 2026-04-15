import { useState } from 'react'
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveForecastWeather() {
    const [forecastWeather, setForecastWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    async function fetchForecastWeather(lat, lon) {
        setForecastWeather(null);
        setError(null);
        setLoading(true);

        try {
            if (lat == null || lon == null) {
                throw new Error('Latitude and longitude are required');
            }

            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                    appid: apiKey
                }
            });
            setForecastWeather(response.data);
        }
        
        catch (err) {
            setError(err.response?.data?.message || err.message);
        }
        
        finally {
            setLoading(false);
        }
    };

    return { forecastWeather, loading, error, fetchForecastWeather };
};

export default useRetrieveForecastWeather;
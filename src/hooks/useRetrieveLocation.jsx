import { useState } from 'react'
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveLocation() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchLocation(city, state) {
        setLat(null);
        setLon(null);
        setError(null);
        setLoading(true);
        try {
            if (!city || !state ||
                typeof city !== "string" || typeof state !== "string" ||
                city.trim() === "" || state.trim() === "") {
                throw new Error('City and state are required');
            }

            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
                params: {
                    q: `${city.trim()},${state.trim()},US`,
                    limit: 1,
                    appid: apiKey
                }
            });
            
            if (!response.data?.length) {
                throw new Error('Location not found');
            }

            const data = response.data[0];
            setLat(data.lat);
            setLon(data.lon);
        
        }
        
        catch (err) {
            setError(err.response?.data?.message || err.message);
        }
        
        finally {
            setLoading(false);
        }
    }

    return { lat, lon, error, loading, fetchLocation };
};

export default useRetrieveLocation;
import { useState } from 'react'
import axios from 'axios';

const retrieveLocationEndpoint = import.meta.env.VITE_RETRIEVE_LOCATION_ENDPOINT;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveLocation() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchLocation(city, state, country) {
        setLat(null);
        setLon(null);
        setError(null);
        setLoading(true);
        try {
            if (!city || !state || !country ||
                typeof city !== "string" || typeof state !== "string" || typeof country !== "string" ||
                city.trim() === "" || state.trim() === "" || country.trim() === "") {
                throw new Error('City, state, and country are required');
            }

            const response = await axios.get(retrieveLocationEndpoint, {
                params: {
                    q: `${city.trim()},${state.trim()},${country.trim()}`,
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
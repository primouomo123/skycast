import { useState } from 'react'
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveLocation(city, state) {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [error, setError] = useState(null);

    async function fetchLocation() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=${apiKey}`);
            
            if (response.data && response.data.message) {
                throw new Error(response.data.message);
            }

            else if (Array.isArray(response.data) && response.data.length > 0) {
                const data = response.data[0];
                setLon(data.lon);
                setLat(data.lat);
            }

            else {
                throw new Error('No location data found');
            }
        
        }
        
        catch (err) {
            setError(err.message);
        }
    }

    return { lat, lon, error };
};

export default useRetrieveLocation;
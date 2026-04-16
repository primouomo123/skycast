import { useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function useGetState() {
    const [fetchedState, setFetchedState] = useState(null);
    
    async function fetchState(lat, lon) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse`, {
                params: {
                    lat: lat,
                    lon: lon,
                    limit: 1,
                    appid: apiKey
                }
            });

            if (response.data && response.data.length > 0) {
                const state = response.data[0].state || null;
                setFetchedState(state);
            } else {
                setFetchedState(null);
            }
        } catch (error) {
            console.error("Error fetching state:", error);
            setFetchedState(null);

        }
    }

    return { fetchedState, fetchState };
}
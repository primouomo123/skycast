import { useState } from "react";
import axios from "axios";

const getCityStateAndCountryEndpoint = import.meta.env.VITE_GET_CITY_STATE_AND_COUNTRY_ENDPOINT;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function useGetCityStateAndCountry() {
    const [fetchedCity, setFetchedCity] = useState(null);
    const [fetchedState, setFetchedState] = useState(null);
    const [fetchedCountry, setFetchedCountry] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    async function fetchCityStateAndCountry(lat, lon) {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(getCityStateAndCountryEndpoint, {
                params: {
                    lat: lat,
                    lon: lon,
                    limit: 1,
                    appid: apiKey
                }
            });

            if (response.data && response.data.length > 0) {
                const city = response.data[0].name || null;
                const state = response.data[0].state || null;
                const country = response.data[0].country || null;
                setFetchedCity(city);
                setFetchedState(state);
                setFetchedCountry(country);
            } else {
                setFetchedCity(null);
                setFetchedState(null);
                setFetchedCountry(null);
            }
        } catch (error) {
            console.error("Error fetching city, state, and country:", error);
            setFetchedCity(null);
            setFetchedState(null);
            setFetchedCountry(null);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { fetchedCity, fetchedState, fetchedCountry, fetchCityStateAndCountry, error, loading };
}
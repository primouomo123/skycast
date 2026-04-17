import { createContext, useState, useContext, useEffect } from 'react';
import useRetrieveCurrentWeather from '../hooks/useRetrieveCurrentWeather';
import useRetrieveLocation from '../hooks/useRetrieveLocation';
import { celsiusToFahrenheit } from '../utils/celsiustoFahrenheit';

import getWeatherIcon from '../utils/getWeatherIcon';
import useGetState from '../hooks/useGetState';

const CurrentLocationContext = createContext();

export const CurrentLocationProvider = ({ children }) => {
    const { lat, lon, error: locationError, loading: locationLoading, fetchLocation } = useRetrieveLocation();
    const { weatherData, error: weatherError, loading: weatherLoading, fetchCurrentWeather } = useRetrieveCurrentWeather();
    const { fetchedState, fetchState } = useGetState();

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);
    const [searchedCity, setSearchedCity] = useState(null);
    const [searchedState, setSearchedState] = useState(null);

    const [isCelsius, setIsCelsius] = useState(false);

    const handleUnitToggle = () => {
        setIsCelsius((prev) => !prev);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLat(position.coords.latitude);
                    setCurrentLon(position.coords.longitude);
                },
                () => {
                    setCurrentLat(null);
                    setCurrentLon(null);
                }
            );
        } else {
            setCurrentLat(null);
            setCurrentLon(null);
        }
    }, []);

    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchCurrentWeather(currentLat, currentLon);
        }
    }, [currentLat, currentLon]);

    useEffect(() => {
    if (searchedCity && searchedState) {
        fetchLocation(searchedCity, searchedState);
    }
    }, [searchedCity, searchedState, fetchLocation]);

    useEffect(() => {
    if (lat !== null && lon !== null) {
        setCurrentLat(lat);
        setCurrentLon(lon);
    }
    }, [lat, lon]);

    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchState(currentLat, currentLon);
        }
    }, [currentLat, currentLon]);

    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    // Dynamically derive fields from weatherData
    const city = weatherData?.name || null;
    const state = fetchedState || null;
    const condition = weatherData?.weather?.[0]?.main || null;
    const icon = getWeatherIcon(weatherData?.weather?.[0]?.icon) || null;
    const description = weatherData?.weather?.[0]?.description || null;
    const tempC = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : null;
    const tempF = tempC !== null ? Math.round(celsiusToFahrenheit(tempC)) : null;
    const feelsLikeC = weatherData?.main?.feels_like ? Math.round(weatherData.main.feels_like) : null;
    const feelsLikeF = feelsLikeC !== null ? Math.round(celsiusToFahrenheit(feelsLikeC)) : null;
    const tempMinC = weatherData?.main?.temp_min ? Math.round(weatherData.main.temp_min) : null;
    const tempMinF = tempMinC !== null ? Math.round(celsiusToFahrenheit(tempMinC)) : null;
    const tempMaxC = weatherData?.main?.temp_max ? Math.round(weatherData.main.temp_max) : null;
    const tempMaxF = tempMaxC !== null ? Math.round(celsiusToFahrenheit(tempMaxC)) : null;
    const humidity = weatherData?.main?.humidity || null;
    const country = weatherData?.sys?.country || null;
    const timezone = weatherData?.timezone || null;
    const dateTime = weatherData ? new Date((weatherData.dt + timezone) * 1000) : null;
    const date = dateTime
        ? dateTime.getUTCFullYear() +
            "-" +
            String(dateTime.getUTCMonth() + 1).padStart(2, "0") +
            "-" +
            String(dateTime.getUTCDate()).padStart(2, "0")
        : null;

    const time = dateTime
        ? String(dateTime.getUTCHours()).padStart(2, "0") +
            ":" +
            String(dateTime.getUTCMinutes()).padStart(2, "0") +
            ":" +
            String(dateTime.getUTCSeconds()).padStart(2, "0")
        : null;

const dayOfWeek = dateTime ? daysOfTheWeek[dateTime.getUTCDay()] : null;
    return (
        <CurrentLocationContext.Provider
            value={{
                setCurrentLat,
                setCurrentLon,
                searchedCity,
                searchedState,
                setSearchedCity,
                setSearchedState,
                currentLat,
                currentLon,
                locationError,
                locationLoading,
                city,
                state,
                condition,
                description,
                tempC,
                tempF,
                icon,
                country,
                weatherError,
                weatherLoading,
                dateTime,
                time,
                date,
                dayOfWeek,
                feelsLikeC,
                feelsLikeF,
                tempMinC,
                tempMinF,
                tempMaxC,
                tempMaxF,
                humidity,
                daysOfTheWeek,
                isCelsius,
                handleUnitToggle

            }}
        >
            {children}
        </CurrentLocationContext.Provider>
    );

};

export const useCurrentContext = () => useContext(CurrentLocationContext);
import { createContext, useState, useContext, useEffect } from 'react';
import useRetrieveCurrentWeather from '../hooks/useRetrieveCurrentWeather';
import useRetrieveLocation from '../hooks/useRetrieveLocation';

import { weatherMap } from '../utils/weatherMap';
import getWeatherIcon from '../utils/getWeatherIcon';

const CurrentLocationContext = createContext();

export const CurrentLocationProvider = ({ children }) => {
    const { lat, lon, error: locationError, loading: locationLoading, fetchLocation } = useRetrieveLocation();
    const { weatherData, error: weatherError, loading: weatherLoading, fetchCurrentWeather } = useRetrieveCurrentWeather();

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);

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

    // Dynamically derive fields from weatherData
    const city = weatherData?.name || null;
    const condition = weatherMap[weatherData?.weather?.[0]?.main]?.label || weatherData?.weather?.[0]?.main || null;
    const icon = getWeatherIcon(weatherData?.weather?.[0]?.icon) || null;
    const description = weatherData?.weather?.[0]?.description || null;
    const tempC = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : null;
    const feelsLikeC = weatherData?.main?.feels_like ? Math.round(weatherData.main.feels_like) : null;
    const tempMinC = weatherData?.main?.temp_min ? Math.round(weatherData.main.temp_min) : null;
    const tempMaxC = weatherData?.main?.temp_max ? Math.round(weatherData.main.temp_max) : null;
    const humidity = weatherData?.main?.humidity || null;
    const country = weatherData?.sys?.country || null;
    const dateTime = weatherData ? new Date(weatherData.dt * 1000) : null;
    const time = dateTime ? dateTime.toLocaleTimeString() : null;
    const date = dateTime ? dateTime.toLocaleDateString() : null;
    const day = dateTime ? dateTime.toLocaleDateString(undefined, { weekday: 'long' }) : null;
    return (
        <CurrentLocationContext.Provider
            value={{
                setCurrentLat,
                setCurrentLon,
                city,
                condition,
                description,
                tempC,
                icon,
                country,
                weatherError,
                weatherLoading,
                dateTime,
                time,
                date,
                day,
                feelsLikeC,
                tempMinC,
                tempMaxC,
                humidity
            }}
        >
            {children}
        </CurrentLocationContext.Provider>
    );

};

export const useCurrentLocation = () => useContext(CurrentLocationContext);
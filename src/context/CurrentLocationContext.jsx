import { createContext, useState, useContext, useEffect, use } from 'react';
import useRetrieveCurrentWeather from '../hooks/useRetrieveCurrentWeather';

import { weatherMap } from '../utils/weatherMap';
import getWeatherIcon from '../utils/getWeatherIcon';

const CurrentLocationContext = createContext();

export const CurrentLocationProvider = ({ children }) => {
    const { weatherData, error: weatherError, loading: weatherLoading, fetchCurrentWeather } = useRetrieveCurrentWeather();

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLat(position.coords.latitude);
          setCurrentLon(position.coords.longitude);
        },    
        () => {
          setCurrentLat(null);
          setCurrentLon(null);
        });
      }, []);

    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchCurrentWeather(currentLat, currentLon);
        }
    }, [currentLat, currentLon]);

    // Dynamically derive fields from weatherData
    const city = weatherData?.name || null;
    const condition = weatherMap[weatherData?.weather?.[0]?.main]?.label || weatherData?.weather?.[0]?.main || null;
    const Icon = weatherMap[weatherData?.weather?.[0]?.main]?.icon || null;
    const fallBackIconImage = getWeatherIcon(weatherData?.weather?.[0]?.icon) || null;
    const description = weatherData?.weather?.[0]?.description || null;
    const temp = weatherData?.main?.temp || null;
    const country = weatherData?.sys?.country || null;
    const dateTime = weatherData ? new Date(weatherData.dt * 1000) : null;
    const time = dateTime ? dateTime.toLocaleTimeString() : null;
    const date = dateTime ? dateTime.toLocaleDateString() : null;

    return (
        <CurrentLocationContext.Provider
            value={{
                setCurrentLat,
                setCurrentLon,
                city,
                condition,
                description,
                temp,
                Icon,
                fallBackIconImage,
                country,
                weatherError,
                weatherLoading,
                dateTime,
                time,
                date
            }}
        >
            {children}
        </CurrentLocationContext.Provider>
    );

};

export const useCurrentLocation = () => useContext(CurrentLocationContext);
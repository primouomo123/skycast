import { createContext, useState, useContext, useEffect } from 'react';
import useRetrieveForecastWeather from '../hooks/useRetrieveForecastWeather';
import { useCurrentContext } from './CurrentLocationContext';

const ForecastLocationContext = createContext();

export const ForecastLocationProvider = ({ children }) => {
    const { currentLat, currentLon } = useCurrentContext();
    const { forecastWeather, error: forecastError, loading: forecastLoading, fetchForecastWeather } = useRetrieveForecastWeather();

    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchForecastWeather(currentLat, currentLon);

        }
    }, [currentLat, currentLon]);

    // Dynamically derive fields from forecastWeather data



    return (
        <ForecastLocationContext.Provider
            value={{
                forecastWeather,
                forecastError,
                forecastLoading
            }}
        >
            {children}
        </ForecastLocationContext.Provider>
    );
};

export const useForecastContext = () => useContext(ForecastLocationContext);
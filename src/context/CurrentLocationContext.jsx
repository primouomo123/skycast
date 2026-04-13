import { createContext, useState, useContext, useEffect, use } from 'react';
import useRetrieveCurrentWeather from '../hooks/useRetrieveCurrentWeather';

const CurrentLocationContext = createContext();

export const CurrentLocationProvider = ({ children }) => {
    const { weatherData, error: weatherError, loading: weatherLoading, fetchCurrentWeather } = useRetrieveCurrentWeather();

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);
    const [userCity, setUserCity] = useState(null);

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
    const main = weatherData?.weather?.[0]?.main || null;
    const description = weatherData?.weather?.[0]?.description || null;
    const temp = weatherData?.main?.temp || null;
    const country = weatherData?.sys?.country || null;

    return (
        <CurrentLocationContext.Provider
            value={{
                setCurrentLat,
                setCurrentLon,
                city,
                main,
                description,
                temp,
                country,
                weatherError,
                weatherLoading
            }}
        >
            {children}
        </CurrentLocationContext.Provider>
    );

};

export const useCurrentLocation = () => useContext(CurrentLocationContext);
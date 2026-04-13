import { createContext, useState, useContext, useEffect, use } from 'react';
import useRetrieveCurrentWeather from '../hooks/useRetrieveCurrentWeather';

const CurrentLocationContext = createContext();

export const CurrentLocationProvider = ({ children }) => {
    const { weatherData, error: weatherError, loading: weatherLoading, fetchCurrentWeather } = useRetrieveCurrentWeather();

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);
    const [currentCity, setCurrentCity] = useState('null');
    const [currentState, setCurrentState] = useState('null');

    useEffect(() => {
        fetchCurrentWeather(currentLat, currentLon);
    }, [currentLat, currentLon]);

    return (
        <CurrentLocationContext.Provider value={{setCurrentLat, setCurrentLon}} >
            {children}
        </CurrentLocationContext.Provider>
    )

};

export const useCurrentLocation = () => useContext(CurrentLocationContext);
import { useState, createContext, useContext, useEffect, useMemo } from 'react';
import useRetrieveFullWeather from '../hooks/useRetrieveFullWeather';
import useRetrieveLocation from '../hooks/useRetrieveLocation';
import useGetCityStateAndCountry from '../hooks/useGetCityStateAndCountry';
import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import getWeatherIcon from '../utils/getWeatherIcon';
import { metersPerSecondToKilometersPerHour, metersPerSecondToMilesPerHour } from '../utils/metersPerSecondConverter';

const FullLocationWeatherContext = createContext();

export function FullLocationWeatherProvider({ children }) {
    const { lat, lon, error: locationError, loading: locationLoading, fetchLocation } = useRetrieveLocation();
    const { weatherData, error: weatherError, fetchFullWeather, loading: weatherLoading } = useRetrieveFullWeather();
    const { fetchedCity, fetchedState, fetchedCountry, error: getError, loading: getLoading, fetchCityStateAndCountry } = useGetCityStateAndCountry();

    const [currentLat, setCurrentLat] = useState(null);
    const [currentLon, setCurrentLon] = useState(null);
    const [searchedCity, setSearchedCity] = useState(null);
    const [searchedState, setSearchedState] = useState(null);
    const [searchedCountry, setSearchedCountry] = useState("US");

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
        if (searchedCity && searchedState && searchedCountry) {
            fetchLocation(searchedCity, searchedState, searchedCountry);
        }
        }, [searchedCity, searchedState, searchedCountry]);
    
    useEffect(() => {
    if (lat !== null && lon !== null) {
        setCurrentLat(lat);
        setCurrentLon(lon);
    }
    }, [lat, lon]);
    
    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchCityStateAndCountry(currentLat, currentLon);
        }
    }, [currentLat, currentLon]);

    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchFullWeather(currentLat, currentLon);
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

    // ---------Current Weather Logic starts here---------
    const currentWeather = useMemo(() => {
        if (!weatherData || !weatherData.current) return {};

        const current = weatherData.current;
        const city = fetchedCity;
        const state = fetchedState;
        const country = fetchedCountry;
        const currentCondition = current.weather && current.weather.length > 0 ? current.weather[0].main : null;
        const currentDescription = current.weather && current.weather.length > 0 ? current.weather[0].description : null;
        const currentIcon = current.weather && current.weather.length > 0 ? getWeatherIcon(current.weather[0].icon) : null;
        const currentTempC = Math.round(current.temp);
        const currentTempF = Math.round(celsiusToFahrenheit(current.temp));
        const currentFeelsLikeC = Math.round(current.feels_like);
        const currentFeelsLikeF = Math.round(celsiusToFahrenheit(current.feels_like));
        const currentHumidity = current.humidity;
        const currentWindSpeedKPH = current.wind_speed ? Math.round(metersPerSecondToKilometersPerHour(current.wind_speed)) : null;
        const currentWindSpeedMPH = current.wind_speed ? Math.round(metersPerSecondToMilesPerHour(current.wind_speed)) : null;
        const currentWindGustKPH = current.wind_gust ? Math.round(metersPerSecondToKilometersPerHour(current.wind_gust)) : null;
        const currentWindGustMPH = current.wind_gust ? Math.round(metersPerSecondToMilesPerHour(current.wind_gust)) : null;

        const currentDateTime = new Date((current.dt + weatherData.timezone_offset) * 1000);

        const currentTime = currentDateTime
                ? String(currentDateTime.getUTCHours()).padStart(2, "0") +
                    ":" +
                    String(currentDateTime.getUTCMinutes()).padStart(2, "0") +
                    ":" +
                    String(currentDateTime.getUTCSeconds()).padStart(2, "0")
                : null;

        const currentDayOfWeek = currentDateTime ? daysOfTheWeek[currentDateTime.getUTCDay()] : null;

        const currentDate = currentDateTime
                ? currentDateTime.getUTCFullYear() +
                    "-" +
                    String(currentDateTime.getUTCMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(currentDateTime.getUTCDate()).padStart(2, "0")
                : null;
        
        return {
            city,
            state,
            country,
            currentCondition,
            currentDescription,
            currentIcon,
            currentTempC,
            currentTempF,
            currentFeelsLikeC,
            currentFeelsLikeF,
            currentHumidity,
            currentWindSpeedKPH,
            currentWindSpeedMPH,
            currentWindGustKPH,
            currentWindGustMPH,
            currentDateTime: currentDateTime ? currentDateTime.toISOString() : null,
            currentTime,
            currentDayOfWeek,
            currentDate
        }
    }, [weatherData]);
    // ---------Current Weather Logic ends here---------


    // ----------Daily Forecast Logic starts here---------
    const dailyForecast = useMemo(() => {
        if (!weatherData || !weatherData.daily) return [];

        const dailyWeather = weatherData.daily.map((day) => {
            const dailyMinTempC = Math.round(day.temp.min);
            const dailyMinTempF = Math.round(celsiusToFahrenheit(day.temp.min));
            const dailyMaxTempC = Math.round(day.temp.max);
            const dailyMaxTempF = Math.round(celsiusToFahrenheit(day.temp.max));
            const dailyCondition = day.weather && day.weather.length > 0 ? day.weather[0].main : null;
            const dailyDescription = day.weather && day.weather.length > 0 ? day.weather[0].description : null;
            const dailyIcon = day.weather && day.weather.length > 0 ? getWeatherIcon(day.weather[0].icon) : null;
            const dailyHumidity = day.humidity;

            const dailyDateTime = new Date((day.dt + weatherData.timezone_offset) * 1000);
            
            const dailyDayOfWeek = dailyDateTime ? daysOfTheWeek[dailyDateTime.getUTCDay()] : null;

            const dailyDate = dailyDateTime
                ? dailyDateTime.getUTCFullYear() +
                    "-" +
                    String(dailyDateTime.getUTCMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(dailyDateTime.getUTCDate()).padStart(2, "0")
                : null;
            
            return {
                dailyMinTempC,
                dailyMinTempF,
                dailyMaxTempC,
                dailyMaxTempF,
                dailyCondition,
                dailyDescription,
                dailyIcon,
                dailyHumidity,
                dailyDateTime,
                dailyDayOfWeek,
                dailyDate
            }
        });

        return dailyWeather;
    }, [weatherData]);


    // ----------Daily Forecast Logic ends here---------
    

    const value = {
        isCelsius,
        handleUnitToggle,
        setCurrentLat,
        setCurrentLon,
        searchedCity,
        setSearchedCity,
        searchedState,
        setSearchedState,
        searchedCountry,
        setSearchedCountry,
        fetchedCity,
        fetchedState,
        fetchedCountry,
        getError,
        getLoading,
        locationError,
        locationLoading,
        weatherError,
        weatherLoading,
        ...currentWeather,
        dailyForecast
    }

    return (
        <FullLocationWeatherContext.Provider value={value}>
            {children}
        </FullLocationWeatherContext.Provider>
    )

}

export const useWeatherContext = () => useContext(FullLocationWeatherContext);
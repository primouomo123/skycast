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
            fetchLocation(searchedCity, searchedState);
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
            ? currentDateTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: "UTC"
              })
            : null;

        const currentDayOfWeek = currentDateTime
            ? currentDateTime.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })
            : null;

        const currentDate = currentDateTime
                ? currentDateTime.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC"
                })
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
    }, [weatherData, fetchedCity, fetchedState, fetchedCountry]);
    // ---------Current Weather Logic ends here---------

    // ---------Hourly Forecast Logic starts here---------
    const hourlyForecast = useMemo(() => {
        if (!weatherData || !weatherData.hourly) return [];

        const hourlyWeather = weatherData.hourly.map((hour) => {
            const hourlyTempC = Math.round(hour.temp);
            const hourlyTempF = Math.round(celsiusToFahrenheit(hour.temp));
            const hourlyCondition = hour.weather && hour.weather.length > 0 ? hour.weather[0].main : null;
            const hourlyDescription = hour.weather && hour.weather.length > 0 ? hour.weather[0].description : null;
            const hourlyIcon = hour.weather && hour.weather.length > 0 ? getWeatherIcon(hour.weather[0].icon) : null;
            const hourlyHumidity = hour.humidity;
            
            const hourlyDateTime = new Date((hour.dt + weatherData.timezone_offset) * 1000);

            const hourlyDayOfWeek = hourlyDateTime
                ? hourlyDateTime.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" })
                : null;

            const hourlyTime = hourlyDateTime
                ? hourlyDateTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: "UTC"
              })
            : null;

            return {
                hourlyTempC,
                hourlyTempF,
                hourlyCondition,
                hourlyDescription,
                hourlyIcon,
                hourlyHumidity,
                hourlyDateTime,
                hourlyTime,
                hourlyDayOfWeek
            }
        });

        return hourlyWeather;
    }, [weatherData]);


    // ----------Hourly Forecast Logic ends here---------


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
            
            const dailyDayOfWeek = dailyDateTime
                ? dailyDateTime.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" })
                : null;

            const dailyDate = dailyDateTime
                ? dailyDateTime.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC"
                })
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
        dailyForecast,
        hourlyForecast
    }

    return (
        <FullLocationWeatherContext.Provider value={value}>
            {children}
        </FullLocationWeatherContext.Provider>
    )

}

export const useWeatherContext = () => useContext(FullLocationWeatherContext);
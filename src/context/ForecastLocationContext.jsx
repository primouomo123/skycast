import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import useRetrieveForecastWeather from '../hooks/useRetrieveForecastWeather';
import { useCurrentContext } from './CurrentLocationContext';

import { weatherMap } from '../utils/weatherMap';
import getWeatherIcon from '../utils/getWeatherIcon';

const ForecastLocationContext = createContext();

export const ForecastLocationProvider = ({ children }) => {
    const { currentLat, currentLon } = useCurrentContext();
    const { forecastWeather, error: forecastError, loading: forecastLoading, fetchForecastWeather } = useRetrieveForecastWeather();

    useEffect(() => {
        if (currentLat !== null && currentLon !== null) {
            fetchForecastWeather(currentLat, currentLon);

        }
    }, [currentLat, currentLon]);

    // Grouping data by date
    function groupByDay(data) {
      const days = {};

      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];

        const entry = {
            tempC: Math.round(item.main.temp),
            feelsLikeC: Math.round(item.main.feels_like),
            tempMinC: Math.round(item.main.temp_min),
            tempMaxC: Math.round(item.main.temp_max),
            condition: item.weather[0].main,
            description: item.weather[0].description,
            humidity: item.main.humidity,
            date: date,
            time: item.dt_txt.split(" ")[1]
          };

        if (!days[date]) {
          days[date] = [];
        }
        days[date].push(entry);
      });

      return days;
    }

    const dataByDay = useMemo(() => {
      if (!forecastWeather) return null;
      return groupByDay(forecastWeather);
    }, [forecastWeather]);

    // Log the grouped data to verify
    console.log(dataByDay);

    // Getting data by Day
    const forecastData = useMemo(() => {
      if (!dataByDay) return null;

      const result = [];

      for (const date in dataByDay) {

      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      const tempMinC = Math.round(dataByDay[date].reduce((sum, entry) => sum + entry.tempMinC, 0) / dataByDay[date].length);
      const tempMaxC = Math.round(dataByDay[date].reduce((sum, entry) => sum + entry.tempMaxC, 0) / dataByDay[date].length);
      let condition = null;
      let icon = null;
      let description = null;
      let humidity = null;

      // Getting the best condition for the day (preferably at 15:00:00, otherwise at 12:00:00) and the icon for that condition
      let selectedEntry = null;
      for (const entry of dataByDay[date]) {
        if (entry.time === "15:00:00") {
          selectedEntry = entry;
          break;
        } else if (entry.time === "12:00:00") {
          selectedEntry = entry;
        }
      }

      if (!selectedEntry) {
          selectedEntry = dataByDay[date][0]; // Fallback to the first entry if neither 15:00:00 nor 12:00:00 is found
        }

      condition = weatherMap[selectedEntry.condition]?.label || selectedEntry.condition;
      icon = getWeatherIcon(selectedEntry.condition);
      description = selectedEntry.description;
      humidity = selectedEntry.humidity;

      result.push({
        date,
        day,
        tempMinC,
        tempMaxC,
        condition,
        icon,
        description,
        humidity
      });
    }

    return result;
    
    }, [dataByDay]);



    return (
        <ForecastLocationContext.Provider
            value={{
                forecastData,
                forecastError,
                forecastLoading
            }}
        >
            {children}
        </ForecastLocationContext.Provider>
    );
};

export const useForecastContext = () => useContext(ForecastLocationContext);
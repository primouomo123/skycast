import { createContext, useState, useContext, useEffect } from 'react';
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

    const data_by_day = forecastWeather ? groupByDay(forecastWeather) : null;

    // Log the grouped data to verify
    console.log(data_by_day);

    // Getting data by Day
    const forecastData = [];
    for (const date in data_by_day) {

      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      const tempMinC = Math.round(data_by_day[date].reduce((sum, entry) => sum + entry.tempMinC, 0) / data_by_day[date].length);
      const tempMaxC = Math.round(data_by_day[date].reduce((sum, entry) => sum + entry.tempMaxC, 0) / data_by_day[date].length);
      let condition = null;
      let icon = null;
      let description = null;
      let humidity = null;

      // Getting the best condition for the day (preferably at 15:00:00, otherwise at 12:00:00) and the icon for that condition
      for (const entry of data_by_day[date]) {
        if (entry.time === "15:00:00") {
          condition = weatherMap[entry.condition]?.label || entry.condition;
          icon = getWeatherIcon(entry.condition);
          description = entry.description;
          humidity = entry.humidity;
          break;
        } else if (entry.time === "12:00:00") {
          condition = weatherMap[entry.condition]?.label || entry.condition;
          icon = getWeatherIcon(entry.condition);
          description = entry.description;
          humidity = entry.humidity;
        } else {
          condition = weatherMap[data_by_day[date][0].condition]?.label || data_by_day[date][0].condition;
          icon = getWeatherIcon(data_by_day[date][0].condition);
          description = data_by_day[date][0].description;
          humidity = data_by_day[date][0].humidity;

        }
      }
    }



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
import { createContext, useContext, useEffect, useMemo } from 'react';
import useRetrieveForecastWeather from '../hooks/useRetrieveForecastWeather';
import { useCurrentContext } from './CurrentLocationContext';
import getWeatherIcon from '../utils/getWeatherIcon';

const ForecastLocationContext = createContext();

export const ForecastLocationProvider = ({ children }) => {
  const { currentLat, currentLon } = useCurrentContext();
  const { forecastWeather, error: forecastError, loading: forecastLoading, fetchForecastWeather } =
    useRetrieveForecastWeather();

  // Fetch forecast when location changes
  useEffect(() => {
    if (currentLat !== null && currentLon !== null) {
      fetchForecastWeather(currentLat, currentLon);
    }
  }, [currentLat, currentLon]);

  // Group forecast entries by CITY LOCAL DATE
 function groupByDay(data) {
  const days = {};
  const timeZoneOffset = data.city.timezone || 0; // seconds
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  data.list.forEach((item) => {
    const dateTime = new Date((item.dt + timeZoneOffset) * 1000);

    const date =
      dateTime.getUTCFullYear() +
      "-" +
      String(dateTime.getUTCMonth() + 1).padStart(2, "0") +
      "-" +
      String(dateTime.getUTCDate()).padStart(2, "0");

    const time =
      String(dateTime.getUTCHours()).padStart(2, "0") +
      ":" +
      String(dateTime.getUTCMinutes()).padStart(2, "0") +
      ":" +
      String(dateTime.getUTCSeconds()).padStart(2, "0");

    const dayOfWeek = daysOfTheWeek[dateTime.getUTCDay()];

    const entry = {
      tempC: Math.round(item.main.temp),
      feelsLikeC: Math.round(item.main.feels_like),
      tempMinC: Math.round(item.main.temp_min),
      tempMaxC: Math.round(item.main.temp_max),
      condition: item.weather[0].main,
      description: item.weather[0].description,
      icon: getWeatherIcon(item.weather[0].icon),
      humidity: item.main.humidity,
      dateTime,
      time,
      date,
      day: dayOfWeek,
    };

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(entry);
  });

  return days;
}

  // Process raw forecast data into daily summaries
  const dataByDay = useMemo(() => {
    if (!forecastWeather) return null;
    return groupByDay(forecastWeather);
  }, [forecastWeather]);

  // Building the forecast data array with one entry per day
  const forecastData = useMemo(() => {
    if (!dataByDay) return [];

    const result = [];

    // Sorting dates to ensure consistent order in the UI (oldest → newest)
    const sortedDates = Object.keys(dataByDay).sort();

    for (const date of sortedDates) {
      const entries = dataByDay[date];

      const tempMinC = Math.min(...entries.map(e => e.tempMinC));
      const tempMaxC = Math.max(...entries.map(e => e.tempMaxC));

      // Pick best entry (16:00 → 13:00 → fallback)
      let selectedEntry =
        entries.find(e => e.time === "16:00:00") ||
        entries.find(e => e.time === "13:00:00") ||
        entries[0];

      result.push({
        date: selectedEntry.date,
        day: selectedEntry.day,
        time: selectedEntry.time,
        tempMinC,
        tempMaxC,
        condition: selectedEntry.condition,
        icon: selectedEntry.icon,
        description: selectedEntry.description,
        humidity: selectedEntry.humidity
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

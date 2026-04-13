import { useState } from 'react'
import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function useRetrieveForecastWeather() {
    const [forecastWeather, setForecastWeather] = useState(null);
    
};
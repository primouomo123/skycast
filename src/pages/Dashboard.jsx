import { CircularProgress, Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import { useWeatherContext } from "../context/FullLocationWeatherContext";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyForecastLayout from "../components/HourlyForecastLayout";
import ForecastLayout from "../components/ForecastLayout";

export default function Dashboard() {
  const {
    city,
    weatherLoading,
    locationLoading,
    getLoading,
    weatherError,
    locationError,
    getError,
  } = useWeatherContext();

  if (weatherError || locationError || getError) {
    return <Navigate to="/error" />;
  }

  if (weatherLoading || city == null) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <CurrentWeatherCard />
      <HourlyForecastLayout />
      <ForecastLayout />
    </>
  );
}
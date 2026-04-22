import { Box, CircularProgress, Typography } from "@mui/material";
import HourlyWeatherCard from "./HourlyWeatherCard";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function HourlyForecastLayout() {
  const {
    hourlyForecast,
    weatherLoading,
    locationLoading,
    getLoading,
    weatherError,
    locationError,
    getError,
  } = useWeatherContext();

  if (
    weatherLoading ||
    locationLoading ||
    getLoading ||
    hourlyForecast == null ||
    hourlyForecast.length === 0
  ) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  }

  if (weatherError || locationError || getError) {
    return <div>Error: {weatherError || locationError || getError}</div>;
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 2 }}
        >
          Next Hours
        </Typography>

        <Typography variant="h5" fontWeight={800}>
          Hourly Forecast
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          px: 0.5,
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(120,120,120,0.35)",
            borderRadius: 999,
          },
        }}
      >
        {hourlyForecast.map((hourData, index) => (
          <Box
            key={`${hourData.hourlyDayOfWeek}-${hourData.hourlyTime}-${index}`}
            sx={{
              flex: "0 0 auto",
            }}
          >
            <HourlyWeatherCard hourData={hourData} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default HourlyForecastLayout;
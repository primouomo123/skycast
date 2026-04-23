import { Box, CircularProgress, Typography } from "@mui/material";
import ForecastWeatherCard from "./ForecastWeatherCard";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function ForecastLayout() {
  const { dailyForecast } = useWeatherContext();

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 2 }}
        >
          Outlook
        </Typography>

        <Typography variant="h5" fontWeight={800}>
          7-Day Forecast
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
        {dailyForecast.map((dayData) => (
          <Box
            key={dayData.dailyDate}
            sx={{
              flex: "0 0 auto",
            }}
          >
            <ForecastWeatherCard dayData={dayData} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ForecastLayout;
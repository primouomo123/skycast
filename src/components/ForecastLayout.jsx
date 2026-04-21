import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import ForecastWeatherCard from './ForecastWeatherCard';
import { useWeatherContext } from '../context/FullLocationWeatherContext';

function ForecastLayout() {
  const {
    dailyForecast,
    weatherLoading,
    locationLoading,
    getLoading,
    weatherError,
    locationError,
    getError
  } = useWeatherContext();

  if (
    weatherLoading ||
    locationLoading ||
    getLoading ||
    dailyForecast == null ||
    dailyForecast.length === 0
  ) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  }

  if (weatherError || locationError || getError) {
    return <div>Error: {weatherError || locationError || getError}</div>;
  }

  return (
    <Box sx={{ mt: 1, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
          Outlook
        </Typography>

        <Typography variant="h4" fontWeight={800}>
          7-Day Forecast
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          A quick look at the week ahead
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
        {dailyForecast.map((dayData) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dayData.dailyDate}>
            <ForecastWeatherCard dayData={dayData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ForecastLayout;
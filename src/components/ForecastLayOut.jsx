/*
import { Grid, CircularProgress } from '@mui/material';
import ForecastWeatherCard from './ForeCastWeatherCard';
import { useForecastContext } from '../context/ForecastLocationContext';

function ForecastLayout() {
  const { 
    forecastData,
    forecastError,
    forecastLoading,
   } = useForecastContext();

   if (forecastLoading || forecastData == null || forecastData.length === 0) {
    return (
      <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
    )
   }

   if (forecastError) {
    return <div>Error: {forecastError}</div>;
   }

   const content = forecastData.map((dayData) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={dayData.date}>
      <ForecastWeatherCard
        dayData={dayData}
      />
    </Grid>
  ));


  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: 2,
        display: "flex",
        justifyContent: "center"
      }}
    >
      {content}
    </Grid>
  );
}

export default ForecastLayout;
*/
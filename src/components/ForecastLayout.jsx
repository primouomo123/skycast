import { Grid, CircularProgress } from '@mui/material';
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

   if (weatherLoading || locationLoading || getLoading || dailyForecast == null || dailyForecast.length === 0) {
    return (
      <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
    )
   }

   if (weatherError || locationError || getError) {
    return <div>Error: {weatherError || locationError || getError}</div>;
   }

   const content = dailyForecast.map((dayData) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={dayData.dailyDate}>
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
import { Grid } from '@mui/material';
import CurrentWeatherCard from './CurrentWeatherCard';
import { useCurrentLocation } from '../context/CurrentLocationContext';

function ForecastLayout() {
  const { weatherError, weatherLoading } = useCurrentLocation();

  if (weatherLoading) {
    return <div>Loading...</div>;
  }

  if (weatherError) {
    return <div>Error: {weatherError}</div>;
  }

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
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <CurrentWeatherCard />
      </Grid>
    </Grid>
  );
}

export default ForecastLayout;

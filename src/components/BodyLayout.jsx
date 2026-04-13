import { Grid } from '@mui/material';

import CurrentWeatherCard from './CurrentWeatherCard';

function BodyLayout() {
    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
                <CurrentWeatherCard />
            </Grid>
        </Grid>
    );
}

export default BodyLayout;
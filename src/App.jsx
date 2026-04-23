import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, CircularProgress } from '@mui/material';
import { lightTheme, darkTheme } from './style/theme';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import HourlyForecastLayout from './components/HourlyForecastLayout';
import ForecastLayout from './components/ForecastLayout';
import { useWeatherContext } from './context/FullLocationWeatherContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { 
    city,
    weatherLoading,
    locationLoading,
    getLoading,
    weatherError,
    locationError,
    getError
   } = useWeatherContext();

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  let content = null;

  if (weatherLoading || locationLoading || getLoading) {
    content = <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 20 }} />;
  }

  else if (weatherError || locationError || getError) {
    content = <div>Error: {weatherError || locationError || getError}</div>;
  }

  else {
    content = (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SearchBar />
            <CurrentWeatherCard />
            <HourlyForecastLayout />
            <ForecastLayout />
          </Box>
    )
  }
  

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at top, rgba(59,130,246,0.12), transparent 35%), linear-gradient(180deg, #0b1220 0%, #111827 100%)'
              : 'radial-gradient(circle at top, rgba(59,130,246,0.10), transparent 35%), linear-gradient(180deg, #eef4fb 0%, #f8fbff 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Header
            isDarkMode={isDarkMode}
            handleThemeToggle={handleThemeToggle}
          />

          {content}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
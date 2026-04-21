import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { lightTheme, darkTheme } from './style/theme';

import Header from './components/Header';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastLayout from './components/ForecastLayout';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <CurrentWeatherCard />
            <ForecastLayout />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
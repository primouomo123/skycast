import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { lightTheme, darkTheme } from './style/theme';

import Header from './components/Header'
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastLayout from './components/ForecastLayOut';
import SearchBar from './components/SearchBar';



function App() {

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header  />
        <SearchBar  />
        <CurrentWeatherCard />
        <ForecastLayout />
      </Container>
    </ThemeProvider>
  );
}

export default App;

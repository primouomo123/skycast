import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { lightTheme, darkTheme } from './style/theme';

import Header from './components/Header'
import CurrentWeatherCard from './components/CurrentWeatherCard';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
          setIsDarkMode((prev) => !prev);
        };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header  isDarkMode={isDarkMode} handleThemeToggle={handleThemeToggle} />
        <CurrentWeatherCard />
      </Container>
    </ThemeProvider>
  );
}

export default App;

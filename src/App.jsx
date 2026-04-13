
import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './style/theme';

import './App.css'

import Header from './components/Header'


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header onDarkModeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
    </ThemeProvider>
  );
}

export default App

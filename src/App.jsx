
import { useState } from 'react';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
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
      <Header />
      <div style={{ padding: '1rem' }}>
        <Button variant="contained" onClick={handleThemeToggle}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App

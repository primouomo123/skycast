import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { lightTheme, darkTheme } from './style/theme';

import Header from './components/Header'
import BodyLayout from './components/BodyLayout';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header onDarkModeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        <BodyLayout />
      </Container>
    </ThemeProvider>
  );
}

export default App;

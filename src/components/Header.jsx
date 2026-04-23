import { useWeatherContext } from "../context/FullLocationWeatherContext";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Header({ isDarkMode, handleThemeToggle }) {
  const { isCelsius, handleUnitToggle } = useWeatherContext();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left: Unit Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <IconButton color="inherit" onClick={handleUnitToggle} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {isCelsius ? "°F" : "°C"}
          </IconButton>
        </Box>
        

        {/* Center: Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <WbCloudyIcon />
          <Typography variant="h4">SkyCast</Typography>
        </Box>

        {/* Right: Theme Toggle */}
        <IconButton color="inherit" onClick={handleThemeToggle} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {isDarkMode ? <LightModeIcon sx={{color: "yellow"}} /> : <DarkModeIcon sx={{color: "black"}} />} {isDarkMode ? "Light" : "Dark"} mode
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
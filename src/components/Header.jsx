import { useCurrentContext } from "../context/CurrentLocationContext";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Header({ isDarkMode, handleThemeToggle }) {
  const { isCelsius, handleUnitToggle } = useCurrentContext();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left: User Location's Weather*/}
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <IconButton color="inherit" onClick={handleUnitToggle} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {isCelsius ? "°C" : "°F"}
          </IconButton>
        </Box>
        

        {/* Center: Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <WbCloudyIcon />
          <Typography variant="h4">SkyCast</Typography>
        </Box>

        {/* Right: Actions */}
        <IconButton color="inherit" onClick={handleThemeToggle} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {isDarkMode ? <DarkModeIcon sx={{color: "black"}} /> : <LightModeIcon sx={{color: "yellow"}} />} {isDarkMode ? "Dark" : "Light"} mode
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
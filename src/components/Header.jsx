import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left: Logo*/}
        

        {/* Center: Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <WbCloudyIcon />
          <Typography variant="h6">SkyCast</Typography>
        </div>
        

        {/* Right: Actions */}
        <IconButton color="inherit">
          <DarkModeIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
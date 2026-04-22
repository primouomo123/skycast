import { useState, useRef, useEffect } from "react";
import {
  TextField,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function SearchBar() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const { setSearchedCity, setSearchedState } = useWeatherContext();

  const handleSearch = () => {
    if (city.trim() === "" || state.trim() === "") {
      return;
    }

    setSearchedCity(city);
    setSearchedState(state);
    setCity("");
    setState("");
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 88,
        zIndex: 1100,
        display: "flex",
        justifyContent: "center",
        mt: 7,
      }}
    >
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
          p: 1,
          boxShadow: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
          backgroundColor: "background.paper",
        }}
      >
        <TextField
          label="City"
          variant="outlined"
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          required
          inputRef={inputRef}
        />
        <TextField
          label="State"
          variant="outlined"
          size="small"
          value={state}
          onChange={(e) => setState(e.target.value)}
          sx={{ ml: 2, width: 140 }}
          required
        />
        <IconButton type="submit" color="primary" sx={{ ml: 1 }}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default SearchBar;
import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
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

  return (
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
        mx: "auto",
        p: 1,
        boxShadow: 3,
        mt: 4,
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
      />
      <TextField
        label="State"
        variant="outlined"
        size="small"
        value={state}
        onChange={(e) => setState(e.target.value)}
        sx={{ ml: 2 }}
        required
      />
      <IconButton type="submit" color="primary" sx={{ ml: 2 }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
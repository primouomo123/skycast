import { useState, useRef, useEffect } from "react";
import {
  TextField,
  IconButton,
  Paper,
  Box,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherContext } from "../context/FullLocationWeatherContext";
import { usaStates } from "../utils/states";

function SearchBar() {
  const [city, setCity] = useState("");
  const [state, setState] = useState(null);
  const [stateError, setStateError] = useState(false);

  const { setSearchedCity, setSearchedState } = useWeatherContext();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (city.trim() === "" || !state) {
      setStateError(!state);
      return;
    }

    setSearchedCity(city.trim());
    setSearchedState(state.abbreviation);

    setCity("");
    setState(null);
    setStateError(false);
  };

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
          maxWidth: 540,
          p: 1.25,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: (theme) => theme.palette.background.card,
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 12px 28px rgba(0,0,0,0.28)"
              : "0 10px 25px rgba(15,23,42,0.08)",
          backdropFilter: "blur(14px)",
          gap: 1,
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

        <Autocomplete
          options={usaStates}
          value={state}
          onChange={(event, newValue) => {
            setState(newValue);
            setStateError(false);
          }}
          getOptionLabel={(option) =>
            `${option.abbreviation} - ${option.name}`
          }
          isOptionEqualToValue={(option, value) =>
            option.abbreviation === value.abbreviation
          }
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="State"
              variant="outlined"
              size="small"
              error={stateError}
              helperText={stateError ? "Please select a valid state" : ""}
            />
          )}
        />

        <IconButton
          type="submit"
          color="primary"
          sx={{
            backgroundColor: (theme) => theme.palette.background.soft,
            "&:hover": {
              backgroundColor: "action.selected",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default SearchBar;
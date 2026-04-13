import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSearch = () => {
    if (!city.trim()) return;

    onSearch({
      city: city.trim(),
      state,
    });

    setCity("");
    setState("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 999,
        px: 2,
        py: 1,
        maxWidth: 650,
        width: "100%",
        mx: "auto",
      }}
    >
      {/* CITY INPUT */}
      <TextField
        variant="standard"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
      />

      {/* STATE SELECT (FIXED PLACEHOLDER STYLE) */}
      <TextField
        select
        variant="standard"
        value={state}
        onChange={(e) => setState(e.target.value)}
        sx={{ minWidth: 110 }}
        InputProps={{
          disableUnderline: true,
        }}
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) => {
            if (!selected) {
              return (
                <span style={{ color: "#999" }}>
                  State
                </span>
              );
            }
            return selected;
          },
        }}
      >
        {/* Placeholder option */}
        <MenuItem value="">
          <em>State</em>
        </MenuItem>

        {/* States */}
        {US_STATES.map((st) => (
          <MenuItem key={st} value={st}>
            {st}
          </MenuItem>
        ))}
      </TextField>

      {/* SEARCH BUTTON */}
      <IconButton
        onClick={handleSearch}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
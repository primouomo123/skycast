import { Typography, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

export default function ErrorPage() {
  const { weatherError, locationError, getError } = useWeatherContext();

  const errorMessage = weatherError || locationError || getError;

  if (!errorMessage) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box sx={{ textAlign: "center", mt: 10, color: "error.main" }}>
      <Typography variant="h4" gutterBottom>
        Something went wrong 😔
      </Typography>

      <Typography variant="h6" sx={{ color: "error.main" }}>
        {errorMessage}
      </Typography>
    </Box>
  );
}
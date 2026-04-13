import { Card, CardContent, Typography, Box } from "@mui/material";
import { useCurrentLocation } from "../context/CurrentLocationContext";

function CurrentWeatherCard() {
  const {
    city,
    country,
    temp,
    condition,
    description,
    Icon,
    fallBackIconImage,
    weatherLoading,
    weatherError,
  } = useCurrentLocation();

  if (weatherLoading) {
    return (
      <Card sx={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading...</Typography>
      </Card>
    );
  }

  if (weatherError) {
    return (
      <Card sx={{ minHeight: 200 }}>
        <CardContent>
          <Typography color="error">
            Error: {weatherError}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, minHeight: 200 }}>
      <CardContent>

        {/* Top: City */}
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          {city ? `${city}, ${country}` : "Unknown Location"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
            {/* Left: Weather Icon */}
            {Icon ? <Icon /> : <img src={fallBackIconImage} alt={condition} style={{ width: 80, height: 80 }} />}

        </Box>

        {/* Right: Weather Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4">{temp ? `${Math.round(temp)}°C` : "N/A"}</Typography>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {condition || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, textTransform: "capitalize" }}>
            {description || "No description available."}
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCard;
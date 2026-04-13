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
    weatherError,
  } = useCurrentLocation();

  if (weatherError) {
    return (
      <Card sx={{ borderRadius: 3, minHeight: 200 }}>
        <CardContent>
          <Typography color="error">
            Error: {weatherError}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, minHeight: 200, p: 1 }}>
      <CardContent>

        {/* Top: City */}
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          {city ? `${city}, ${country}` : "Unknown Location"}
        </Typography>

        {/* Main row: Icon + Weather */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            mt: 2,
          }}
        >
          {/* Left: Icon */}
          <Box>
            {Icon ? (
              <Icon sx={{ fontSize: 80 }} />
            ) : (
              <img
                src={fallBackIconImage}
                alt={condition}
                style={{ width: 80, height: 80 }}
              />
            )}
          </Box>

          {/* Right: Weather Details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              textAlign: "right",
            }}
          >
            <Typography variant="h4">
              {temp ? `${Math.round(temp)}°C` : "N/A"}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ textTransform: "capitalize" }}
            >
              {condition || "N/A"}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                textTransform: "capitalize",
              }}
            >
              {description || "No description available."}
            </Typography>
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCard;
import { Card, CardContent, Typography, Box, Divider, CircularProgress } from "@mui/material";
import { useCurrentContext } from "../context/CurrentLocationContext";

function ForecastWeatherCard( {dayData} ) {

  return (
    <Card
      sx={{
        width: "100%",
        mx: 0,
        borderRadius: 4,
        p: 3,
        boxShadow: 4,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
        marginTop: 10
      }}
    >
      <CardContent >

        {/* HEADER */}
        <Box mb={3} textAlign="center">
          <Typography variant="h4" fontWeight={700}>
            {dayData.day}
          </Typography>
        </Box>

        {/* MAIN CONTENT */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >

          {/* LEFT SECTION */}
          <Box flex={1} display="flex" alignItems="center" gap={2}>
            {dayData.icon && (
              <img
                src={dayData.icon}
                alt="Weather Icon"
                style={{ width: 75, height: 75 }}
              />
            )}

            <Box>
              <Typography variant="h6" fontWeight={600}>
                {dayData.condition}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {dayData.description}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                💧 {dayData.humidity}%
              </Typography>
            </Box>
          </Box>

          {/* CENTER SECTION */}
          <Box flex={1} textAlign="center">
            <Typography variant="h2" fontWeight={700} lineHeight={1}>
              Min: {dayData.tempMinC}°
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Max: {dayData.tempMaxC}°
            </Typography>
          </Box>

        </Box>

      </CardContent>
    </Card>
  );
}

export default ForecastWeatherCard;
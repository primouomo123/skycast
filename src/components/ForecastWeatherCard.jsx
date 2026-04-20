import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function ForecastWeatherCard({ dayData }) {
  const { isCelsius } = useWeatherContext();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 220,
        minHeight: 280,
        mx: "auto",
        borderRadius: 4,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {dayData.dailyDayOfWeek}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {dayData.dailyDate}
        </Typography>

        {dayData.dailyIcon && (
          <Box
            component="img"
            src={dayData.dailyIcon}
            alt={dayData.dailyCondition || "Weather icon"}
            sx={{
              width: 80,
              height: 80,
              mb: 1,
            }}
          />
        )}

        <Typography variant="subtitle1" fontWeight={600}>
          {dayData.dailyCondition}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            minHeight: 40,
          }}
        >
          {dayData.dailyDescription}
        </Typography>

        <Divider sx={{ width: "100%", mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Min
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {isCelsius ? `${dayData.dailyMinTempC}°C` : `${dayData.dailyMinTempF}°F`}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Max
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {isCelsius ? `${dayData.dailyMaxTempC}°C` : `${dayData.dailyMaxTempF}°F`}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Humidity: {dayData.dailyHumidity}%
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ForecastWeatherCard;
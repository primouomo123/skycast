import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function ForecastWeatherCard({ dayData }) {
  const { isCelsius } = useWeatherContext();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 230,
        minHeight: 300,
        mx: "auto",
        borderRadius: 5,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 100%)",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 12px 28px rgba(0,0,0,0.28)"
            : "0 12px 28px rgba(15,23,42,0.07)",
        backdropFilter: "blur(14px)",
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
        <Typography variant="h6" fontWeight={800}>
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
              width: 84,
              height: 84,
              mb: 1,
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.12))",
            }}
          />
        )}

        <Typography variant="subtitle1" fontWeight={700}>
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
            flexDirection: "column",
            gap: 1.25,
            width: "100%",
            mb: 2,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.2,
              borderRadius: 3,
              backgroundColor: "action.hover",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Low
            </Typography>
            <Typography variant="h6" fontWeight={800} color="info.main">
              {isCelsius ? `${dayData.dailyMinTempC}°C` : `${dayData.dailyMinTempF}°F`}
            </Typography>
          </Box>

          <Box
            sx={{
              px: 2,
              py: 1.2,
              borderRadius: 3,
              backgroundColor: "action.hover",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              High
            </Typography>
            <Typography variant="h6" fontWeight={800} color="error.main">
              {isCelsius ? `${dayData.dailyMaxTempC}°C` : `${dayData.dailyMaxTempF}°F`}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            color: "text.secondary",
          }}
        >
          <WaterDropOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">
            Humidity {dayData.dailyHumidity}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ForecastWeatherCard;
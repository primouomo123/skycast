import { Card, CardContent, Typography, Box } from "@mui/material";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function HourlyWeatherCard({ hourData }) {
  const { isCelsius } = useWeatherContext();

  return (
    <Card
      sx={{
        width: 140,
        minHeight: 220,
        borderRadius: 4,
        background: (theme) => theme.palette.background.card,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 10px 24px rgba(0,0,0,0.28)"
            : "0 10px 25px rgba(15,23,42,0.08)",
        backdropFilter: "blur(12px)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 16px 34px rgba(0,0,0,0.35)"
              : "0 16px 34px rgba(15,23,42,0.12)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {hourData.hourlyDayOfWeek}
        </Typography>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
          {hourData.hourlyTime}
        </Typography>

        {hourData.hourlyIcon && (
          <Box
            component="img"
            src={hourData.hourlyIcon}
            alt={hourData.hourlyCondition || "Weather icon"}
            sx={{
              width: 64,
              height: 64,
              mb: 1,
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.10))",
            }}
          />
        )}

        <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
          {isCelsius
            ? `${hourData.hourlyTempC}°C`
            : `${hourData.hourlyTempF}°F`}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          {hourData.hourlyCondition}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <WaterDropOutlinedIcon sx={{ fontSize: 16 }} />

          <Typography variant="caption">{hourData.hourlyHumidity}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default HourlyWeatherCard;
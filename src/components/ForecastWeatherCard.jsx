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
        background: (theme) => theme.palette.background.card,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 12px 28px rgba(0,0,0,0.28)"
            : "0 10px 25px rgba(15,23,42,0.08)",
        backdropFilter: "blur(14px)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 18px 40px rgba(0,0,0,0.35)"
              : "0 18px 40px rgba(15,23,42,0.12)",
        },
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
          <TempBox
            label="Low"
            value={
              isCelsius
                ? `${dayData.dailyMinTempC}°C`
                : `${dayData.dailyMinTempF}°F`
            }
            color="info.main"
          />

          <TempBox
            label="High"
            value={
              isCelsius
                ? `${dayData.dailyMaxTempC}°C`
                : `${dayData.dailyMaxTempF}°F`
            }
            color="error.main"
          />
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

function TempBox({ label, value, color }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: 3,
        backgroundColor: (theme) => theme.palette.background.soft,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="h6" fontWeight={800} color={color}>
        {value}
      </Typography>
    </Box>
  );
}

export default ForecastWeatherCard;
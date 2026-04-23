import { Typography, Box, Divider, CircularProgress } from "@mui/material";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { useWeatherContext } from "../context/FullLocationWeatherContext";

function CurrentWeatherCard() {
  const {
    isCelsius,
    city,
    state,
    country,
    currentCondition,
    currentDescription,
    currentIcon,
    currentTempC,
    currentTempF,
    currentFeelsLikeC,
    currentFeelsLikeF,
    currentHumidity,
    currentWindSpeedKPH,
    currentWindSpeedMPH,
    currentWindGustKPH,
    currentWindGustMPH,
    currentTime,
    currentDayOfWeek,
    currentDate
  } = useWeatherContext();

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 5,
        p: { xs: 2.5, md: 4 },
        mt: 3,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 16px 40px rgba(0,0,0,0.35)"
            : "0 16px 40px rgba(15,23,42,0.08)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Box
        sx={{
          mb: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
          Current Weather
        </Typography>

        <Typography variant="h4" fontWeight={800}>
          {city ? `${city}, ${state ? `${state}, ` : ""}${country ?? ""}` : "Unknown Location"}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          {currentDayOfWeek}, {currentDate} • {currentTime}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 2,
            textAlign: { xs: "center", md: "left" },
            minWidth: 0,
          }}
        >
          {currentIcon && (
            <Box
              component="img"
              src={currentIcon}
              alt="Weather Icon"
              sx={{
                width: 90,
                height: 90,
                flexShrink: 0,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
              }}
            />
          )}

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" fontWeight={700} noWrap>
              {currentCondition}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentDescription}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, textAlign: "center", minWidth: 0 }}>
          <Typography variant="h1" lineHeight={1}>
            {isCelsius ? `${currentTempC}°C` : `${currentTempF}°F`}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Feels like {isCelsius ? `${currentFeelsLikeC}°C` : `${currentFeelsLikeF}°F`}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                backgroundColor: "action.hover",
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <AirOutlinedIcon fontSize="small" color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Wind Speed
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {isCelsius ? `${currentWindSpeedKPH} km/h` : `${currentWindSpeedMPH} mph`}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                backgroundColor: "action.hover",
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <ExploreOutlinedIcon fontSize="small" color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Wind Gust
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {isCelsius ? `${currentWindGustKPH} km/h` : `${currentWindGustMPH} mph`}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                backgroundColor: "action.hover",
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <WaterDropOutlinedIcon fontSize="small" color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Humidity
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  {currentHumidity}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CurrentWeatherCard;
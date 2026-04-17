import { Card, CardContent, Typography, Box, Divider, CircularProgress } from "@mui/material";
import { useCurrentContext } from "../context/CurrentLocationContext";

function CurrentWeatherCard() {
  const {
    city,
    state,
    country,
    tempC,
    tempF,
    feelsLikeC,
    feelsLikeF,
    tempMaxC,
    tempMaxF,
    tempMinC,
    tempMinF,
    humidity,
    condition,
    description,
    icon,
    time,
    date,
    dayOfWeek,
    weatherLoading,
    weatherError,
    isCelsius
  } = useCurrentContext();

  if (weatherLoading || tempC == null || city == null) {
    return (
      <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
    );
  }

  if (weatherError) {
    return <div>Error: {weatherError}</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        mx: 0,
        borderRadius: 4,
        p: 3,
        boxShadow: 4,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      {/* HEADER */}
      <Box
        mb={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center"
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          {city}, {state ? `${state}, ` : ""}{country}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {dayOfWeek}, {date} • {time}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3, width: "100%" }} />

        {/* MAIN CONTENT WRAPPER — THIS FIXES EVERYTHING */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            width: "100%",
            flexWrap: "nowrap"
          }}
        >

          {/* LEFT SECTION */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
            {icon && (
              <img
                src={icon}
                alt="Weather Icon"
                style={{ width: 75, height: 75, flexShrink: 0 }}
              />
            )}

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={600} noWrap>
                {condition}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {description}
              </Typography>

            </Box>
          </Box>

          {/* CENTER SECTION */}
          <Box sx={{ flex: 1, textAlign: "center", minWidth: 0 }}>
            <Typography variant="h2" fontWeight={700} lineHeight={1}>
              {isCelsius ? `${tempC}°C` : `${tempF}°F`}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Feels like {isCelsius ? `${feelsLikeC}°C` : `${feelsLikeF}°F`}
            </Typography>
          </Box>

          {/* RIGHT SECTION */}
          <Box sx={{ flex: 1, textAlign: "right", minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Min: <strong>{isCelsius ? `${tempMinC}°C` : `${tempMinF}°F`}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Max: <strong>{isCelsius ? `${tempMaxC}°C` : `${tempMaxF}°F`}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Humidity: <strong>{humidity}%</strong>
            </Typography>
          </Box>

        </Box>

    </Box>
  );
}

export default CurrentWeatherCard;
import { Typography, Box, Divider, CircularProgress } from "@mui/material";
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
    currentDate,
    weatherLoading,
    locationLoading,
    getLoading,
    weatherError,
    locationError,
    getError
  } = useWeatherContext();

  if (weatherLoading || locationLoading || getLoading || currentTempC == null || currentTempF == null) {
    return (
      <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
    );
  }

  if (weatherError) {
    return <div>Error: {weatherError}</div>;
  }

  if (locationError) {
    return <div>Error: {locationError}</div>;
  }

  if (getError) {
    return <div>Error: {getError}</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        mx: 0,
        borderRadius: 4,
        p: 3,
        boxShadow: 4,
        backdropFilter: "blur(6px)",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: 'background.paper', // Use theme paper color
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
           {city ? `${city}, ${state ? `${state}, ` : ""}${country ?? ""}` : "Unknown Location"}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {currentDayOfWeek}, {currentDate} • {currentTime}
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
            {currentIcon && (
              <img
                src={currentIcon}
                alt="Weather Icon"
                style={{ width: 75, height: 75, flexShrink: 0 }}
              />
            )}

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={600} noWrap>
                {currentCondition}
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
                {currentDescription}
              </Typography>

            </Box>
          </Box>

          {/* CENTER SECTION */}
          <Box sx={{ flex: 1, textAlign: "center", minWidth: 0 }}>
            <Typography variant="h2" fontWeight={700} lineHeight={1}>
              {isCelsius ? `${currentTempC}°C` : `${currentTempF}°F`}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Feels like {isCelsius ? `${currentFeelsLikeC}°C` : `${currentFeelsLikeF}°F`}
            </Typography>
          </Box>

          {/* RIGHT SECTION */}
          <Box sx={{ flex: 1, textAlign: "right", minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Wind Speed: <strong>{isCelsius ? `${currentWindSpeedKPH} km/h` : `${currentWindSpeedMPH} mph`}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Wind Gust: <strong>{isCelsius ? `${currentWindGustKPH} km/h` : `${currentWindGustMPH} mph`}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Humidity: <strong>{currentHumidity}%</strong>
            </Typography>
          </Box>

        </Box>

    </Box>
  );
}

export default CurrentWeatherCard;
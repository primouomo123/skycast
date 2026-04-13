import {
  WbSunny,
  Cloud,
  Umbrella,
  Grain,
  Thunderstorm,
  AcUnit,
  BlurOn,
  Air,
  Tornado
} from "@mui/icons-material";

export const weatherMap = {
  Clear: { label: "Sunny", icon: WbSunny },
  Clouds: { label: "Cloudy", icon: Cloud },
  Rain: { label: "Rainy", icon: Umbrella },
  Drizzle: { label: "Light Rain", icon: Grain },
  Thunderstorm: { label: "Storm", icon: Thunderstorm },
  Snow: { label: "Snowy", icon: AcUnit },
  Mist: { label: "Foggy", icon: BlurOn },
  Fog: { label: "Foggy", icon: BlurOn },
  Haze: { label: "Hazy", icon: BlurOn },
  Smoke: { label: "Smoky", icon: BlurOn },
  Dust: { label: "Dusty", icon: Grain },
  Sand: { label: "Dusty", icon: Grain },
  Ash: { label: "Dusty", icon: Grain },
  Squall: { label: "Severe", icon: Air },
  Tornado: { label: "Severe", icon: Tornado }
};
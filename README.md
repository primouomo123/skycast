# Skycast

Skycast is a modern weather dashboard built with React and Vite. It allows users to search for weather conditions by city, view current weather, hourly and daily forecasts, and see weather details such as temperature, humidity, wind speed, and more.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/primouomo123/skycast.git
   cd skycast
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app locally:**
   ```bash
   npm run dev
   ```

## API Used and Endpoints

Skycast uses the [OpenWeatherMap API](https://openweathermap.org/api):
- **Direct Geocoding:** `https://api.openweathermap.org/geo/1.0/direct`
- **Reverse Geocoding:** `https://api.openweathermap.org/geo/1.0/reverse`
- **One Call Weather Data:** `https://api.openweathermap.org/data/3.0/onecall`

## Challenges or Known Bugs

- Ensure the API key is valid and has sufficient quota on OpenWeatherMap.
- Some cities may not be found if not available in the OpenWeatherMap geocoding database.

---

Feel free to contribute or report issues!
export default function GetWeatherIcon(iconCode) {
    if (!iconCode || typeof iconCode !== "string" || iconCode.trim() === "") {
                return null
            }
            return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
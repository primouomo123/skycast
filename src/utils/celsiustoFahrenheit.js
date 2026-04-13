export function celsiusToFahrenheit(celsius) {
    const value = Number(celsius);
    if (isNaN(value)) {
        return null
    }
    return (value * 9/5) + 32;
}
# Faytime 🌍

Track local time, Cloud Cover and Moon in ANY City, Track Major Global Markets time to Close/Open.

## Features

- **🕐 City Time Tracking**: Enter any city name to see its current local time updated in real-time
- **☁️ Weather Information**: View cloud cover percentage, temperature, humidity, and wind speed
- **🌙 Moon Phase**: See the current moon phase with emoji visualization and illumination percentage
- **📊 Global Markets**: Track major stock exchanges with live open/close status and countdown timers

## Markets Tracked

- NYSE (New York Stock Exchange)
- NASDAQ
- London Stock Exchange (LSE)
- Tokyo Stock Exchange (TSE)
- Hong Kong Stock Exchange (HKEX)
- Shanghai Stock Exchange (SSE)

## Technology

This is a **static GitHub page** that requires no server-side processing:

- Pure HTML, CSS, and JavaScript
- Free APIs used:
  - [Open-Meteo](https://open-meteo.com/) - Weather and geocoding (no API key required)
- Built-in moon phase calculation algorithm
- Local timezone calculations for market hours

## Usage

Simply visit the GitHub Pages URL or open `index.html` in any modern web browser.

1. Enter a city name in the search box
2. Click "Track City" or press Enter
3. View real-time local time, weather, and moon phase
4. Scroll down to see global market status

## Database

`cities.json` contains a simple database of:
- Popular cities with their coordinates and timezones
- Major stock exchanges with trading hours and days

## Local Development

To run locally:

```bash
# Clone the repository
git clone https://github.com/CrazyDubya/Faytime.git
cd Faytime

# Start a local web server
python3 -m http.server 8080

# Open in browser
# Navigate to http://localhost:8080
```

## Deployment

This site can be deployed as a static GitHub Page:

1. Go to repository Settings
2. Navigate to Pages section
3. Select branch (e.g., `main` or `copilot/add-time-weather-market-tracking`)
4. Select `/root` folder
5. Save and wait for deployment

The site will be available at: `https://crazydubya.github.io/Faytime/`

## License

MIT License - Feel free to use and modify! 

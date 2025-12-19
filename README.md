# Faytime 🌍

Track local time, Cloud Cover and Moon in ANY City, Track Major Global Markets time to Close/Open.

## Features

- **🕐 City Time Tracking**: Enter any city name to see its current local time updated in real-time
- **☁️ Weather Information**: View cloud cover percentage, temperature, humidity, and wind speed
- **🌙 Moon Phase**: See the current moon phase with emoji visualization and illumination percentage
- **📊 Global Markets**: Track major stock exchanges with live open/close status and countdown timers
- **📺 YouTube Live Status**: Track AgendaFreeTV live stream status (requires API key setup)

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
  - [YouTube Data API v3](https://developers.google.com/youtube/v3) - Live stream status (requires API key)
- Built-in moon phase calculation algorithm
- Local timezone calculations for market hours

## Setup Instructions

### YouTube Live Status Feature

This app tracks live stream status for AgendaFreeTV. To use this feature:

1. **Get a YouTube API Key:**
   ```bash
   # Visit Google Cloud Console
   https://console.cloud.google.com/apis/credentials
   ```

2. **Configure the API Key:**
   - Enable YouTube Data API v3
   - Restrict to your domain: `https://crazydubya.github.io/*`
   - Copy your API key

3. **Update the Code:**
   - Open `index.html`
   - Find line ~1652: `const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY_HERE';`
   - Replace with your restricted key
   - **DO NOT commit your actual key if forking/contributing**

4. **Alternative Setup (GitHub Actions):**
   - Store key in GitHub Secrets
   - Use workflow to inject at build time
   - See `.github/workflows/deploy.yml` for example (if available)

> ⚠️ **Security Note**: Never commit API keys to version control. See [SECURITY.md](SECURITY.md) for best practices.

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

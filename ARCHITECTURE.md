# Faytime Architecture Documentation

## Project Overview

Faytime is a lightweight, static web application that provides real-time tracking of:
- Local time for any city worldwide
- Current weather conditions
- Moon phase information
- Global stock market status (open/closed with countdowns)

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     index.html                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │   HTML       │  │    CSS       │  │   JavaScript     │  │ │
│  │  │  Structure   │  │   Styling    │  │    Logic         │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Application State                        │ │
│  │  • currentCity      • cityLat/cityLon                      │ │
│  │  • timeUpdateInterval   • marketUpdateInterval             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼ API Calls (HTTPS)
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL APIs                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────┐    ┌─────────────────────────────┐  │
│  │  Open-Meteo Geocoding  │    │   Open-Meteo Weather API    │  │
│  │  API (Free, No Key)    │    │   (Free, No Key Required)   │  │
│  │                        │    │                             │  │
│  │  City Name → Lat/Lon   │    │  Lat/Lon → Weather Data     │  │
│  └────────────────────────┘    └─────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. HTML Structure (Lines 1-191)

```
<html>
├── <head>
│   ├── Meta tags (charset, viewport)
│   ├── Title
│   └── <style> (Embedded CSS)
│
└── <body>
    └── <div class="container">
        ├── <h1> Title
        │
        ├── <div class="card"> City Tracker
        │   ├── City input field
        │   ├── "Track City" button
        │   ├── Error message area
        │   ├── Loading indicator
        │   └── City info grid
        │       ├── Local Time box
        │       ├── Weather box
        │       └── Moon Phase box
        │
        └── <div class="card"> Markets
            └── Markets grid (dynamically generated)
```

### 2. CSS Architecture (Lines 7-170)

| Component | Purpose |
|-----------|---------|
| Reset (`*`) | Normalize box model |
| Body | Gradient background, font |
| `.container` | Max-width centering |
| `.card` | White cards with shadows |
| `.city-selector` | Input form styling |
| `.city-info` | Responsive grid layout |
| `.info-box` | Gradient info boxes |
| `.markets-grid` | Market cards grid |
| `.market-card` | Market status cards |
| `.market-card.open` | Open market styling |
| `.moon-display` | Large emoji display |
| Media queries | Mobile responsiveness |

### 3. JavaScript Architecture (Lines 193-582)

```
JavaScript Module Structure
│
├── Data Layer
│   └── markets[] - Market configuration array
│
├── State Management
│   ├── currentCity - Selected city name
│   ├── cityLat/cityLon - Coordinates
│   ├── timeUpdateInterval - Timer ID
│   └── marketUpdateInterval - Timer ID
│
├── Core Functions
│   ├── getMoonPhase(date) - Calculate moon phase
│   ├── getMarketStatus(market) - Check if market open
│   ├── updateMarkets() - Render market cards
│   └── formatMarketHours(market) - Format trading hours
│
├── API Functions
│   ├── geocodeCity(cityName) - Get coordinates
│   └── getWeatherData(lat, lon) - Get weather
│
├── UI Functions
│   ├── updateCity() - Main update function
│   ├── displayCityInfo() - Render city data
│   ├── updateLocalTime() - Real-time clock
│   └── showError() - Display errors
│
└── Event Handlers
    ├── DOMContentLoaded - Initialize app
    ├── beforeunload - Cleanup intervals
    └── keypress (Enter) - Submit city
```

## Data Structures

### Market Object Schema
```javascript
{
    name: string,        // Display name
    symbol: string,      // Short code
    timezone: string,    // IANA timezone
    openHour: number,    // UTC hour (0-23)
    openMinute: number,  // UTC minute (0-59)
    closeHour: number,   // UTC hour (0-23)
    closeMinute: number, // UTC minute (0-59)
    daysOpen: number[],  // Days (0=Sun, 1=Mon...6=Sat)
    holidays: string[]   // Holiday dates (YYYY-MM-DD)
}
```

### Weather Response Schema
```javascript
{
    timezone: string,
    current: {
        temperature_2m: number,
        relative_humidity_2m: number,
        cloud_cover: number,
        wind_speed_10m: number
    }
}
```

### Moon Phase Object
```javascript
{
    emoji: string,       // Phase emoji
    name: string,        // Phase name
    illumination: number // Percentage (0-100)
}
```

## File Structure

```
/Faytime
├── index.html          # Main application (single-page)
├── cities.json         # Reference data (not loaded dynamically)
├── README.md           # User documentation
├── DEPLOYMENT.md       # Deployment guide
├── ARCHITECTURE.md     # This file
├── FLOW.md            # Application flow documentation
└── .gitignore         # Git ignore rules
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Embedded) |
| Logic | Vanilla JavaScript (ES6+) |
| APIs | Open-Meteo (Free) |
| Hosting | GitHub Pages |
| Version Control | Git |

## Security Considerations

1. **No Backend Required** - Reduced attack surface
2. **HTTPS Enforced** - GitHub Pages default
3. **No API Keys** - No secrets to protect
4. **Input Sanitization** - City names encoded
5. **No User Data Storage** - Privacy by design
6. **Content Security Policy** - XSS protection

## Performance Characteristics

| Metric | Value |
|--------|-------|
| Initial Load | ~25KB |
| API Calls | 2 per city search |
| Time Updates | Every 1 second |
| Market Updates | Every 60 seconds |
| Memory Cleanup | On page unload |

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Considerations

1. **Offline Support** - Service Worker caching
2. **PWA Features** - Installable app
3. **Push Notifications** - Market alerts
4. **Historical Data** - Charts and trends
5. **Localization** - Multi-language support

# Deployment Guide for Faytime

This guide explains how to deploy Faytime as a static GitHub Page.

## Prerequisites

- A GitHub account
- Repository access (you have it!)
- No build process needed - pure static HTML/CSS/JS

## Deployment Steps

### Option 1: GitHub Pages (Recommended)

1. **Go to Repository Settings**
   - Navigate to https://github.com/CrazyDubya/Faytime
   - Click on "Settings" tab

2. **Configure GitHub Pages**
   - Scroll down to "Pages" section in the left sidebar
   - Under "Source", select the branch you want to deploy (e.g., `main` or `copilot/add-time-weather-market-tracking`)
   - Select "/ (root)" as the folder
   - Click "Save"

3. **Wait for Deployment**
   - GitHub will automatically build and deploy your site
   - Usually takes 1-2 minutes
   - Check the status at the top of the Pages settings

4. **Access Your Site**
   - Your site will be available at: `https://crazydubya.github.io/Faytime/`
   - GitHub will display the URL in the Pages settings

### Option 2: Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file to the repository root with your domain name
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `crazydubya.github.io`
3. Enter your custom domain in GitHub Pages settings
4. Enable "Enforce HTTPS" for security

### Option 3: Local Testing

For local development and testing:

```bash
# Clone the repository
git clone https://github.com/CrazyDubya/Faytime.git
cd Faytime

# Start a local web server (Python 3)
python3 -m http.server 8080

# Or using Node.js
npx http-server -p 8080

# Open in browser
# Visit: http://localhost:8080
```

## Features Deployed

✅ City time tracking with search
✅ Real-time cloud cover and weather data
✅ Moon phase calculation and display
✅ Global stock market status tracker
✅ Responsive design for mobile/desktop
✅ No backend required - fully client-side

## API Dependencies

The site uses free, public APIs:

1. **Open-Meteo Geocoding API**
   - Used for: Converting city names to coordinates
   - Rate limit: Reasonable for personal use
   - No API key required

2. **Open-Meteo Weather API**
   - Used for: Weather data, cloud cover, temperature
   - Rate limit: Reasonable for personal use
   - No API key required

## Browser Compatibility

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Initial load: ~20KB HTML
- No external dependencies
- Weather API calls: Only when searching for a city
- Updates: Market status every 60 seconds, time every 1 second
- Optimized for static hosting

## Troubleshooting

### Site not loading after deployment
- Wait 2-3 minutes for GitHub Pages to deploy
- Check GitHub Actions tab for build status
- Verify branch and folder settings are correct

### Weather data not loading
- Check browser console for errors
- Verify internet connection
- Open-Meteo API might be temporarily down (rare)

### Markets showing incorrect times
- Note: Market hours don't account for daylight saving time transitions
- This is a known limitation documented in the code
- Consider using moment-timezone library for production use

## Security

- ✅ No sensitive data stored
- ✅ No backend server to secure
- ✅ HTTPS enforced via GitHub Pages
- ✅ No API keys exposed (using free public APIs)
- ✅ CodeQL security check passed

## Maintenance

The site requires minimal maintenance:
- APIs are stable and free
- No dependencies to update
- Automatic HTTPS certificate renewal by GitHub
- Consider updating market trading hours if they change

## Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the README.md for documentation

---

**Last Updated:** December 2025
**Version:** 1.0.0

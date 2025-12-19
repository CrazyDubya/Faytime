# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email the repository owner or create a private security advisory through GitHub.

## API Key Management

This project uses the YouTube Data API v3. To run this project:

1. **Get Your Own API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)

2. **Restrict Your API Key:**
   - Add HTTP referrer restriction: `https://crazydubya.github.io/*`
   - Add API restriction: YouTube Data API v3 only
   - Set quota limits if needed

3. **Configure the Application:**
   - Open `index.html`
   - Replace `YOUR_YOUTUBE_API_KEY_HERE` with your restricted key
   - **Never commit your actual API key to the repository**

## Best Practices

- ✅ Always restrict API keys to specific domains
- ✅ Limit API keys to only the APIs they need
- ✅ Use environment variables for local development
- ✅ Regularly rotate API keys
- ❌ Never commit API keys to version control
- ❌ Never share API keys publicly

## Security Features

- No backend server (reduced attack surface)
- HTTPS enforced via GitHub Pages
- Content Security Policy headers
- No user data storage
- Input sanitization for city names

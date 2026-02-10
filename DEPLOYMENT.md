# Deployment Guide

This guide will help you deploy your BFHL API to various cloud platforms.

## Prerequisites

1. **Google Gemini API Key**: Get your free API key from [Google AI Studio](https://aistudio.google.com)
2. **GitHub Repository**: Push your code to a public GitHub repository
3. **Your Chitkara Email**: Have your official email ready

## Environment Variables Setup

Before deploying, you need to configure these environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `OFFICIAL_EMAIL`: Your Chitkara University email (e.g., `your.name@chitkara.edu.in`)
- `PORT`: Server port (optional, defaults to 3000)

## Platform-Specific Deployment

### 1. Vercel (Recommended)

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project" → "Import Git Repository"
3. Connect your GitHub account and select the repository
4. Configure environment variables:
   - Go to "Environment Variables" section
   - Add `GEMINI_API_KEY` and `OFFICIAL_EMAIL`
5. Click "Deploy"

**Your API URLs will be:**
- Health: `https://your-app-name.vercel.app/health`
- BFHL: `https://your-app-name.vercel.app/bfhl`

### 2. Railway

**Steps:**
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Configure environment variables in the "Variables" tab
5. Click "Deploy"

**Your API URLs will be:**
- Health: `https://your-app-name.up.railway.app/health`
- BFHL: `https://your-app-name.up.railway.app/bfhl`

### 3. Render

**Steps:**
1. Go to [render.com](https://render.com) and sign up
2. Click "New Web Service" → "Connect GitHub repository"
3. Select your repository
4. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables in the "Environment" section
6. Click "Create Web Service"

**Your API URLs will be:**
- Health: `https://your-app-name.onrender.com/health`
- BFHL: `https://your-app-name.onrender.com/bfhl`

## Testing Your Deployed API

After deployment, test your endpoints:

```bash
# Test health endpoint
curl https://your-app-name.vercel.app/health

# Test fibonacci
curl -X POST https://your-app-name.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'

# Test prime numbers
curl -X POST https://your-app-name.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'
```

## Local Testing with ngrok (Temporary)

If you want to test your local server publicly:

1. Install ngrok: `npm install -g ngrok`
2. Start your server: `npm start`
3. In another terminal: `ngrok http 3000`
4. Use the ngrok URL for testing

## Important Notes

- **Environment Variables**: Never commit your `.env` file to Git
- **API Keys**: Keep your Gemini API key secure
- **Email**: Use your official Chitkara University email
- **Repository**: Make sure your GitHub repository is public
- **Testing**: Test all endpoints after deployment

## Troubleshooting

### Common Issues:

1. **AI endpoint not working**: Check if `GEMINI_API_KEY` is correctly set
2. **Server crashes**: Check logs for error messages
3. **Wrong email response**: Verify `OFFICIAL_EMAIL` environment variable
4. **CORS issues**: The API is configured to allow all origins
5. **Rate limiting**: API allows 100 requests per 15 minutes per IP

### Debugging:

- Check platform logs for error messages
- Verify all environment variables are set correctly
- Test locally first, then deploy
- Use the test script: `node test-api.js`

## Submission Checklist

- [ ] GitHub repository is public
- [ ] All endpoints are working correctly
- [ ] Environment variables are configured
- [ ] API is accessible via public URL
- [ ] All test cases pass
- [ ] Error handling works properly
- [ ] AI integration is functional

## Expected Response Format

All successful responses should follow this structure:

```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": ...
}
```

Error responses:

```json
{
  "is_success": false,
  "error": "Error description"
}
```

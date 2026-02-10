# BFHL REST API

A robust REST API implementation for the BFHL competition with support for mathematical operations and AI integration.

## Features

- **POST /bfhl** - Process requests with different operation keys
- **GET /health** - Health check endpoint
- **AI Integration** - Google Gemini API for intelligent responses
- **Security** - Rate limiting, CORS, helmet protection
- **Input Validation** - Comprehensive validation for all endpoints

## Supported Operations

### Fibonacci
```json
{
  "fibonacci": 7
}
```
Returns: `[0,1,1,2,3,5,8]`

### Prime Numbers
```json
{
  "prime": [2,4,7,9,11]
}
```
Returns: `[2,7,11]`

### LCM (Least Common Multiple)
```json
{
  "lcm": [12,18,24]
}
```
Returns: `72`

### HCF (Highest Common Factor)
```json
{
  "hcf": [24,36,60]
}
```
Returns: `12`

### AI Query
```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```
Returns: `"Mumbai"`

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your credentials:
   - `GEMINI_API_KEY` - Get from [Google AI Studio](https://aistudio.google.com)
   - `OFFICIAL_EMAIL` - Your Chitkara University email

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

### POST /bfhl
Process mathematical operations and AI queries.

**Request Structure:**
- Must contain exactly one key
- Valid keys: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`

**Success Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": ...
}
```

**Error Response:**
```json
{
  "is_success": false,
  "error": "Error description"
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configured for cross-origin requests
- **Helmet**: Security headers protection
- **Error Handling**: Graceful error responses with proper HTTP codes

## Deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

### Railway
1. New Project → Deploy from GitHub
2. Select repository
3. Configure environment variables
4. Deploy

### Render
1. New Web Service → Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

## Testing

Use tools like Postman, curl, or any HTTP client to test the endpoints:

```bash
# Health check
curl http://localhost:3000/health

# Fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'

# Prime numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `GEMINI_API_KEY` - Google Gemini API key
- `OFFICIAL_EMAIL` - Your Chitkara University email

## License

MIT License

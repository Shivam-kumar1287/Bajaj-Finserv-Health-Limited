const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'your_chitkara_email@chitkara.edu.in';

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    is_success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/bfhl', limiter);


function fibonacci(n) {
  if (n < 0) throw new Error('Fibonacci input must be non-negative');
  if (n === 0) return [0];
  if (n === 1) return [0, 1];
  
  const result = [0, 1];
  for (let i = 2; i <= n; i++) {
    result.push(result[i-1] + result[i-2]);
  }
  return result;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function getPrimes(arr) {
  return arr.filter(num => isPrime(num));
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function getHCF(arr) {
  if (arr.length === 0) throw new Error('Array cannot be empty');
  return arr.reduce((acc, num) => gcd(acc, num));
}

function getLCM(arr) {
  if (arr.length === 0) throw new Error('Array cannot be empty');
  const lcm = (a, b) => (a * b) / gcd(a, b);
  return arr.reduce((acc, num) => lcm(acc, num));
}

function validateInput(req, res, next) {
  const body = req.body;
  const keys = Object.keys(body);
  
  if (keys.length !== 1) {
    return res.status(400).json({
      is_success: false,
      error: 'Request must contain exactly one key'
    });
  }
  
  const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
  const key = keys[0];
  
  if (!validKeys.includes(key)) {
    return res.status(400).json({
      is_success: false,
      error: 'Invalid key. Must be one of: fibonacci, prime, lcm, hcf, AI'
    });
  }
  
  next();
}

// Routes
app.get('/health', (req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post('/bfhl', validateInput, async (req, res) => {
  try {
    const body = req.body;
    const key = Object.keys(body)[0];
    const value = body[key];
    let data;
    
    switch (key) {
      case 'fibonacci':
        if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
          return res.status(400).json({
            is_success: false,
            error: 'Fibonacci input must be a non-negative integer'
          });
        }
        data = fibonacci(value);
        break;
        
      case 'prime':
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'Prime input must be a non-empty array of integers'
          });
        }
        if (!value.every(num => typeof num === 'number' && Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'All elements in prime array must be integers'
          });
        }
        data = getPrimes(value);
        break;
        
      case 'lcm':
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'LCM input must be a non-empty array of positive integers'
          });
        }
        if (!value.every(num => typeof num === 'number' && Number.isInteger(num) && num > 0)) {
          return res.status(400).json({
            is_success: false,
            error: 'All elements in LCM array must be positive integers'
          });
        }
        data = getLCM(value);
        break;
        
      case 'hcf':
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'HCF input must be a non-empty array of positive integers'
          });
        }
        if (!value.every(num => typeof num === 'number' && Number.isInteger(num) && num > 0)) {
          return res.status(400).json({
            is_success: false,
            error: 'All elements in HCF array must be positive integers'
          });
        }
        data = getHCF(value);
        break;
        
      case 'AI':
        if (typeof value !== 'string' || value.trim().length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'AI input must be a non-empty string'
          });
        }
        
        if (!genAI) {
          return res.status(500).json({
            is_success: false,
            error: 'AI service not configured'
          });
        }
        
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = `Answer this question with a single word or very short phrase (maximum 2 words): ${value}`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text().trim();
          
          // Extract first word if response is longer
          data = text.split(' ')[0];
        } catch (aiError) {
          console.error('AI Error:', aiError);
          return res.status(500).json({
            is_success: false,
            error: 'AI service temporarily unavailable'
          });
        }
        break;
    }
    
    res.json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`BFHL API: http://localhost:${PORT}/bfhl`);
});

module.exports = app;

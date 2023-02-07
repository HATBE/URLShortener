require('dotenv').config(); // load environment variables

const express = require('express');
const app = express();

const cors = require('cors'); // to configure cors
const morgan = require('morgan'); // for logging
const cookieParser = require('cookie-parser'); // for cookie parsing
const rateLimit = require('express-rate-limit') // for rate limit

const routes = require('./routes/routes');

const dbConnection = require('./helpers/dbConnection')
const errorHandler = require('./helpers/errorHandler');

dbConnection(); // connect to mongodb database

// **********
// Middleware
// **********
app.use('*', cors({                             // Cors
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: process.env.URL_FRONTEND || "https://localhost:4200"
}));
app.use(morgan('common'));                      // Logging (common = apache like logging)
app.use(rateLimit({                             // Rate limit
  windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000, // Value in mins
	max: process.env.RATE_LIMIT_MAX || 100,
	standardHeaders: true,
	legacyHeaders: false, 
  message: {message: "Too many requests, please try again later."}
}));
app.use(express.json());                        // JSON parser                                    
app.use(cookieParser());                        // Cookie parser
app.use(errorHandler);                          // Catch if unexpected error

// **********
// Routes
// **********

app.use('/api/', routes);                       // /api/* routes

app.all('*', (req, res) => {                    // Default route
  res.json({"error":"route not found"});
});

module.exports = app;
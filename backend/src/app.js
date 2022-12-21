require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit')
const cors = require('cors');

const routes = require('./routes/routes');

const app = express();

// **********
// DB conn
// **********

mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res) => {
  console.log('[INIT] successfully connected to database!');
})
.catch((error) => {
  // if Server can't connect to DB, exit with an error code
  console.warn('[INIT] error while connecting to database:');
  console.warn(error);
  process.exit(1);
});

// **********
// Middleware
// **********

app.use(cors({                                  // Cors
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: process.env.URL_FRONTEND || "https://localhost:4200"
}));
app.use(morgan('common'));                      // Logging
app.use(rateLimit({                             // Rate limit
  windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000, // Value in mins
	max: process.env.RATE_LIMIT_MAX || 100,
	standardHeaders: true,
	legacyHeaders: false, 
  message: {message: "Too many requests, please try again later."}
}));
app.use(express.json());                        // JSON parser
app.use(express.urlencoded({extended: false})); // Urlencoded parser
app.use(cookieParser());                        // Cookie parser
app.use((err, req, res, next) => {              // Catch if unexpected error
  if(err) {
      res.status(500).json({message: "Something went wrong"});
      console.warn(err);
  }
});

// **********
// Routes
// **********

app.use('/api/', routes);                       // /api/* routes

app.all('*', (req, res) => {                    // Default route
  res.json({"error":"route not found"});
});

module.exports = app;
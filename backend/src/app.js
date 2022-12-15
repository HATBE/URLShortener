require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')

const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes/routes');

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

const app = express();

// CORS stuff
app.use(cors({
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: process.env.URL_FRONTEND
}));

// MIDLEWARE
app.use(morgan('common'))
app.use(express.json()); // json parser
app.use(express.urlencoded({extended: false})); // urlencoded parser
app.use(cookieParser()); // cookie parser

app.use((err, req, res, next) => {
  if(err) {
      res.status(500).json({message: "Something went wrong"});
      console.warn(err);
  }
})

app.use('/api/', routes);

// Default route
app.all('*', (req, res, next) => {
  res.json({"error":"route not found"})
});

module.exports = app;
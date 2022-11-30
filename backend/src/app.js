require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const routes = require('./routes/routes');

const app = express();

mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Successfully connected to database!');
});

// CORS stuff
app.use(cors({
  credentials: true,
  origin: '*'
}));

// MIDLEWARE
app.use(bodyParser.json()); // json parser
app.use(bodyParser.urlencoded({extended: false})); // urlencoded parser
app.use(cookieParser()); // cookie parser

app.use('/api/', routes);

// Default route
app.get('*', (req, res, next) => {
  res.json({"error":"route not found"})
});

module.exports = app;
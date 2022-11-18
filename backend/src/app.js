require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const urlsRoutes = require('./routes/urls');

const app = express();

mongoose.connect(process.env.DB_CONN)
.then(() => {
  console.log('Successfully connected to database!');
})
.catch((c) => {
  console.error(c);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use('/api/urls', urlsRoutes);

module.exports = app;
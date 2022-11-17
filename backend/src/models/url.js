const mongoose = require('mongoose');

const url = mongoose.Schema({
    url: {type: String, required: true},
    shorturl: {type: String, required: true},
    date: {type: Number, required: true}
});

module.exports = mongoose.model('Url', url);
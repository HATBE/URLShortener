const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    url: {
        type: String, 
        required: true
    },
    shorturl: {
        type: String, 
        required: true,
        unique: true
    },
    date: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('Url', urlSchema);
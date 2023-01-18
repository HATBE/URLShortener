const mongoose = require('mongoose');

const urlTrackerSchema = mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url',
        required: true
    },
    date: {
        type: Number, 
        required: true
    },
    ip: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('UrlTracker', urlTrackerSchema);
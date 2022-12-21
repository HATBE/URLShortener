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
});

module.exports = mongoose.model('UrlTracker', urlTrackerSchema);
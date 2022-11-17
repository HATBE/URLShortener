const express = require("express");
const router = express.Router();
const randomString = require('randomString');

const UrlModel = require('../models/url');

router.get("/", (req, res, next) => {
    UrlModel.findById("6376470f3fb8404f55006381").then(url => {
        console.log(url)
    })
    res.status(200).json({})
});

router.post("/", (req, res, next) => {
    if(!req.body.url) {
        res.status(400).json({message: "failed, please provide a url"});
        return;
    }
    if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(req.body.url)) {
        res.status(400).json({message: "failed, please provide a valid url"});
        return;
    }
    const url = new UrlModel({
        url: req.body.url,
        shorturl: randomString.generate(8),
        date: Math.round(Date.now() / 1000)
    });
    url.save().then(url => {
        res.status(200).json({
            message: "successfully added a url",
            url: {
                url: url.url,
                shorturl: url.shorturl,
                fullshorturl: `${req.hostname}/u/${url.shorturl}`,
                date: url.date
            }
        })
    })

});

module.exports = router;

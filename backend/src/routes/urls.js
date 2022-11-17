const express = require("express");
const router = express.Router();
const randomString = require('randomString');

const UrlModel = require('../models/url');

router.get("/", (req, res, next) => {
    res.status(200).json({})
});

router.post("/", (req, res, next) => {
    // check if url is passed in the body
    if(!req.body.url) {
        res.status(400).json({message: "failed, please provide a url"});
        return;
    }
    // check if url is valid
    if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(req.body.url)) {
        res.status(400).json({message: "failed, please provide a valid url"});
        return;
    }
    let shorturl;
    let rep = false;
    do {
        // generate new shorturl, check if it akready exists in db, if exists, repeat
        shorturl = randomString.generate({
            length: 9,
            charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        });
        UrlModel.exists({shorturl: shorturl}).then(ex => {
            if(ex) rep = true;
        });
    } while(rep);
    // build UrlModel
    const url = new UrlModel({
        url: req.body.url,
        shorturl: shorturl,
        date: Math.round(Date.now() / 1000)
    });
    // save UrlModel
    url.save().then(url => {
        res.status(200).json({
            message: "successfully added a url",
            url: {
                url: url.url,
                shorturl: url.shorturl,
                fullshorturl: `${req.hostname}/u/${url.shorturl}`,
                date: url.date
            }
        });
    });

});

module.exports = router;

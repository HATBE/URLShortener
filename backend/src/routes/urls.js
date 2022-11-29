const express = require("express");
const router = express.Router();
const randomString = require('randomString');

const UrlModel = require('../models/url');

router.get("/:id", (req, res, next) => {
    // check if id is right
    if(req.params.id.length !== 9) {
        res.status(400).json({message: "wrong id"});
        return;
    }
    UrlModel.findOne({shorturl: req.params.id}).then(result => {
        if(result) {
            res.status(200).json({
                message: "url found",
                url: {
                    url: result.url,
                    shorturl: result.shorturl,
                    date: result.date
                }
            });
        } else {
            res.status(404).json({message: "url not found"});
        }
    });
});

router.post("/", (req, res, next) => {
    // check if url is passed in the body
    if(!req.body.url) {
        res.status(400).json({message: "failed, please provide a url"});
        return;
    }
    // check if url is valid
    if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(req.body.url)) {
        res.status(400).json({message: "failed, please provide a valid url"});
        return;
    }
    let shorturl;
    let rep = false;
    do {
        // generate new shorturl, check if it akready exists in db, if exists, repeat
        shorturl = randomString.generate({
            length: 9
        });
        UrlModel.exists({shorturl: shorturl}).then(result => {
            if(result) rep = true;
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
                date: url.date
            }
        });
    });
});

module.exports = router;

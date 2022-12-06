const express = require("express");
const router = express.Router();
const randomString = require('randomString');
const jwt = require('jsonwebtoken');

const UrlModel = require('../models/url');
const UserModel = require('../models/user');

const Auth = require('../classes/Auth')

// get all posts by user
router.get('/my', async (req, res) => {
    const user = await Auth.getUserFromCookie(req.cookies);

    if(!user) {
        return res.status(401).json({message: "unauthorized"});
    }

    let urls = await UrlModel.find({userid: user.getId()});

    let date = Math.round(Date.now() / 1000);

    urls.sort(url => {if(url.date < date) return -1});

    urls = urls.map(u => {
        return {
            id: u._id,
            url: u.url,
            shorturl: u.shorturl,
            date: u.date
        }
    });

    res.status(200).json({
        message: "success",
        urls: urls
    });
});

// create post
router.post("/", async (req, res) => {
    let userid = null;

    if(req.cookies['authtoken']) {
        const cookie = req.cookies['authtoken'];
        const claims = jwt.verify(cookie, process.env.JWT_SECRET);
        if(!claims) {
            return res.status(401).json({message: 'Unauthenticated'});
        }
        let user = await UserModel.findOne({_id: claims.id});
        userid = await user.toJSON()._id;
    }

    // check if url is passed in the body
    if(!req.body.url) {
        return res.status(400).json({message: "failed, please provide a url"});
    }
    // check if url is valid
    if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(req.body.url)) {
        return res.status(400).json({message: "failed, please provide a valid url"});
    }
    // check if url is in range
    if(req.body.url.length < 1 || req.body.url > 2048) {
        return res.status(400).json({message: "url not in range (1-2048)"});
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
        date: Math.round(Date.now() / 1000),
        userid: userid || null
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

// get post with id
router.get("/:id", (req, res) => {
    // check if id is right
    if(req.params.id.length !== 9) {
        return res.status(400).json({message: "wrong id"});
    }
    UrlModel.findOne({shorturl: req.params.id}).then(result => {
        if(result) {
            res.status(200).json({
                message: "url found",
                url: {
                    url: result.url,
                    shorturl: result.shorturl,
                    date: result.date,
                    userid: result.userid
                }
            });
        } else {
            res.status(404).json({message: "url not found"});
        }
    });
});

// delete post with id
router.delete("/:id", async (req, res) => {
    const user = await Auth.getUserFromCookie(req.cookies);

    if(!user) {
        return res.status(401).json({message: "unauthorized"});
    }

    // check if id is right
    if(req.params.id.length !== 9) {
        return res.status(400).json({message: "wrong id"});
    }

    // check if url exists
    if(!await UrlModel.exists({shorturl: req.params.id})) {
        return res.status(404).json({message: "url was not found"});
    }

    // check if user has access to url
    if(!await UrlModel.exists({shorturl: req.params.id, userid: user.getId()})) {
        return res.status(404).json({message: "you don't have access to this url"});
    }

    UrlModel.deleteOne({shorturl: req.params.id}).then(result => {
        res.status(200).json({message: "ok"});
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();

const UrlModel = require('../models/url');

const Url = require('../classes/Url');
const UrlTracker = require('../classes/UrlTracker');
const Validate = require("../classes/Validate");

const mustAuthorize = require('../middleware/mustAuthorize');

// create url
router.post("/", async (req, res) => {
    // check if url is passed in the body
    if(!req.body.url) {
        return res.status(400).json({status: false, message: "please provide a url"});
    }

    const rUrl = req.body.url;

    if(!Validate.url(rUrl)) {
        return res.status(400).json({status: false, message: "please provide a valid url"});
    }

    const myurl = await Url.create(rUrl, req.user);

    res.status(200).json({
        status: true, 
        message: "successfully added a url",
        data: {
            url: await myurl.getAsObject()
        }
    });
});

// get all urls by user
router.get('/my', mustAuthorize, async (req, res) => {
    let urls = await UrlModel.find({userid: req.user.getId()});
        
    let date = Math.round(Date.now() / 1000);
    urls.sort(url => {if(url.date < date) return -1});

    let newUrls = [];

    for (let i = 0; i < urls.length; i++) {
        newUrls.push(await (await Url.getFromId(urls[i]._id)).getAsObject());
    }

    res.status(200).json({
        status: true,
        message: "success",
        data: {
            urls: newUrls
        }
    });
});

// get url stats  with id
router.get("/:id/stats", mustAuthorize, async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "id is not in a valid format"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({status: false, message: "url not found"});
    }

    // check if user is the owner of this url
    if((await url.getUser()).getId() != req.user.getId()) {
        return res.status(401).json({status: false, message: "Unauthorized"});
    }

    return res.status(200).json({
        status: true, 
        message: "stats of the url",
        data: {
            stats: await url.getStats(),
            url: await url.getAsObject()
        }
    });
});

// get url accesslist with id
router.get("/:id/accesslist", mustAuthorize, async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "id is not in a valid format"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({status: false, message: "url not found"});
    }

    // check if user is the owner of this url
    if((await url.getUser()).getId() != req.user.getId()) {
        return res.status(401).json({status: false, message: "Unauthorized"});
    }

    return res.status(200).json({
        status: true, 
        message: "stats of the url",
        data: {
            accesslist: await url.getTrackers(),
            url: await url.getAsObject()
        }
    });
});


// get urls  with id
router.get("/:id", async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "id is not in a valid format"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({status: false, message: "url not found"});
    }

    // enter data from user into url tracker
    UrlTracker.create(await url.getRawId(), process.env.LOG_LOG_USER_IPS == "1" ? req.socket.remoteAddress : null);

    return res.status(200).json({
        status: true, 
        message: "url found",
        data: {
            url: await url.getAsObject()
        }
    });
});

// delete url with id
router.delete("/:id", mustAuthorize, async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "id is not in a valid format"});
    }

    const del = await Url.deleteForUser(req.params.id, req.user);

    if(!del.state) {
        return res.status(400).json({status: false, message: del.reason});
    }
    
    res.status(200).json({status: true, message: "ok"});
});

module.exports = router;
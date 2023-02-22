const express = require("express");
const router = express.Router();

const UrlModel = require('../models/url');

const Url = require('../classes/Url');
const UrlTracker = require('../classes/UrlTracker');
const Validate = require("../classes/Validate");

const mustAuthorize = require('../middleware/mustAuthorize');

// -> create a url
router.post("/", async (req, res) => {
    // check if url is passed in the body
    if(!req.body.url) {
        return res.status(400).json({status: false, message: "Please provide a url!"});
    }

    const rUrl = req.body.url;

    if(!Validate.url(rUrl)) {
        return res.status(400).json({status: false, message: "Please provide a valid url!"});
    }
    
    if(req.user) {
        // if user is logged in
        const foundOld = await UrlModel.findOne({userid: req.user.getId(), url: rUrl});
        if(foundOld) {
            // if the same user tried to shorten this url in the past
            return res.status(400).json({status: false, message: `You already shortened this url! ID: "${foundOld.shorturl}"` });
        }
    }

    const myurl = await Url.create(rUrl, req.user);

    res.status(200).json({
        status: true, 
        message: "Successfully added a url.",
        data: {
            url: await myurl.getAsObject()
        }
    });
});

// g-> get all urls from the loggedin user
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

// -> get stats of a url by its id
router.get("/:id/stats", mustAuthorize, async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({status: false, message: "The url was not found!"});
    }

    // check if user is the owner of this url
    if((await url.getUser()).getId() != req.user.getId()) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
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

// -> get the accesslist of a url by its id
router.get("/:id/accesslist", mustAuthorize, async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({status: false, message: "The url was not found!"});
    }

    // check if user is the owner of this url
    if((await url.getUser()).getId() != req.user.getId()) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
    }

    return res.status(200).json({
        status: true, 
        message: "accesslist of the url",
        data: {
            accesslist: await url.getTrackers(),
            url: await url.getAsObject()
        }
    });
});


// -> get a url with its id
router.get("/:id", async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({status: false, message: "The url was not found!"});
    }

    // enter data from user into url tracker
    UrlTracker.create(await url.getRawId(), process.env.LOG_LOG_USER_IPS == "1" ? req.socket.remoteAddress : "feauture disabled");

    return res.status(200).json({
        status: true, 
        message: "The url was found.",
        data: {
            url: await url.getAsObject()
        }
    });
});

// -> delete a url with its id
router.delete("/:id", mustAuthorize, async (req, res) => {
    // check if id is right
    if(req.params.id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    const del = await Url.deleteForUser(req.params.id, req.user);

    if(!del.state) {
        return res.status(400).json({status: false, message: del.reason});
    }
    
    res.status(200).json({status: true, message: "ok"});
});

module.exports = router;
const express = require("express");
const router = express.Router();

const UrlModel = require('../models/url');
const UrlTrackerModel = require('../models/urlTracker');

const UrlTracker = require('../classes/UrlTracker');
const Validate = require("../classes/Validate");
const Pagination = require("../classes/Pagination");
const UrlManager = require("../classes/UrlManager");

const mustAuthorize = require('../middleware/mustAuthorize');

// -> get stats of a url by its id
router.get("/:id/stats", mustAuthorize, async (req, res) => {
    let {id} = req.params;

    // check if id is right
    if(id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }
   
    const url = await UrlManager.getFromShorturl(id);

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
    let {page} = req.query;
    let {id} = req.params;

    if(!Validate.pageNumber(page)) {
        page = 1;
    }

    // check if id is right
    if(id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }
   
    const url = await UrlManager.getFromShorturl(id);

    if(!url) {
        return res.status(404).json({status: false, message: "The url was not found!"});
    }

    // check if user is the owner of this url
    if((await url.getUser()).getId() != req.user.getId()) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
    }

    const pagination = new Pagination(page, await UrlTrackerModel.find({url: url.getRawId()}).count())

    const trackers  = await UrlTrackerModel.find(
        {url: url.getRawId()}, 
        {}, 
        {
            limit: pagination.getLimit(), 
            skip: pagination.getSkip()
        }
    )
    .sort({date: -1});

    if(!trackers) return false;

    const classTrackers = [];

    for (let i = 0; i < trackers.length; i++) {
        classTrackers.push(await (new UrlTracker(trackers[i])).getAsObject());
    }

    return res.status(200).json({
        status: true, 
        message: "accesslist of the url",
        data: {
            accesslist: classTrackers,
            url: await url.getAsObject(),
            pagination: pagination.getAsObject()
        }
    });
});


// -> get a url with its id
router.get("/:id", async (req, res) => {
    let {id} = req.params;

    // check if id is right
    if(id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }
   
    const url = await UrlManager.getFromShorturl(id);

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


// -> create a url
router.post("/", async (req, res) => {
    const {url} = req.body;

    // check if url is passed in the body
    if(!url) {
        return res.status(400).json({
            status: false, 
            message: "Please provide a url!"
        });
    }

    // check if url is valid 
    if(!Validate.url(url)) {
        return res.status(400).json({
            status: false, 
            message: "Please provide a valid url!"
        });
    }
    
    console.log(req.user)

    if(req.user) {
        // if user is logged in
        const foundOldUrl = await UrlModel.findOne({
                                userid: req.user.getId(), 
                                url: url
                            });

        if(foundOldUrl) {
            // if the same user tried to shorten this url in the past
            return res.status(400).json({
                status: false, 
                message: `You already shortened this url! ID: "${foundOldUrl.shorturl}"`
            });
        }
    }

    const newUrl = await UrlManager.create(url, req.user);

    res.status(200).json({
        status: true, 
        message: "Successfully added the url to your account.",
        data: {
            url: await newUrl.getAsObject()
        }
    });
});

// -> delete a url with its id
router.delete("/:id", mustAuthorize, async (req, res) => {
    let {id} = req.params;

    // check if id is right
    if(id.length !== (+process.env.SHORTURL_LENGTH || 9)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    const del = await UrlManager.deleteForUser(id, req.user);

    if(!del.state) {
        return res.status(400).json({status: false, message: del.reason});
    }
    
    res.status(200).json({status: true, message: "ok"});
});

module.exports = router;
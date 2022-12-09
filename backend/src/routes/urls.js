const express = require("express");
const router = express.Router();

const UrlModel = require('../models/url');

const Url = require('../classes/Url');
const User = require('../classes/User');
const Validate = require("../classes/Validate");

// create url
router.post("/", async (req, res) => {
    const user = await User.getFromCookie(req.cookies);
    
    // check if url is passed in the body
    if(!req.body.url) {
        return res.status(400).json({message: "please provide a url"});
    }

    const rUrl = req.body.url;

    if(!Validate.url(rUrl)) {
        return res.status(400).json({message: "please provide a valid url"});
    }

    const myurl = await Url.create(rUrl, user);

    res.status(200).json({
        message: "successfully added a url",
        url: await myurl.getAsObject()
    });
});

// get all posts by user
router.get('/my', async (req, res) => {
    const user = await User.getFromCookie(req.cookies);

    if(!user) {
        return res.status(401).json({message: "unauthorized"});
    }

    let urls = await UrlModel.find({userid: user.getId()});
        
    let date = Math.round(Date.now() / 1000);
    urls.sort(url => {if(url.date < date) return -1});

    let newUrls = [];

    for (let i = 0; i < urls.length; i++) {
        newUrls.push(await (await Url.getFromId(urls[i]._id)).getAsObject());
    }

    res.status(200).json({
        message: "success",
        urls: newUrls
    });
});

// get post with id
router.get("/:id", async (req, res) => {
    // check if id is right
    if(req.params.id.length !== 9) {
        return res.status(400).json({message: "id is not in a valid format"});
    }
   
    const url = await Url.getFromShorturl(req.params.id);

    if(!url) {
        return res.status(404).json({message: "url not found"});
    }

    return res.status(200).json({
        message: "url found",
        url:  await url.getAsObject()
    });
});

// delete post with id
router.delete("/:id", async (req, res) => {
    const user = await User.getFromCookie(req.cookies);

    if(!user) {
        return res.status(401).json({message: "unauthorized"});
    }

    // check if id is right
    if(req.params.id.length !== 9) {
        return res.status(400).json({message: "id is not in a valid format"});
    }

    const del = await Url.delete(req.params.id, user);

    if(!del.state) {
        return res.status(404).json({message: del.reason});
    }
    
    res.status(200).json({message: "ok"});
});

module.exports = router;
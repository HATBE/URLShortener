const express = require("express");
const router = express.Router();

const User = require('../classes/User');
const Url = require('../classes/Url');
const UrlTracker = require("../classes/UrlTracker");

router.get('/', async (req, res) => {
    usersCount = await User.getCount();
    urlsCount = await Url.getCount();
    urlsClickedCount = await UrlTracker.getCount();

    res.status(200).send({
        usersCount: usersCount,
        urlsCount: urlsCount,
        urlsClicked: urlsClickedCount
    });
})

module.exports = router;
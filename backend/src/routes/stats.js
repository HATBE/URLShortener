const express = require("express");
const router = express.Router();

const User = require('../classes/User');
const Url = require('../classes/Url');
const UrlTracker = require("../classes/UrlTracker");
const UrlManager = require("../classes/UrlManager");
const UserManager = require("../classes/UserManager");

// -> get stats of the whole application
router.get('/', async (req, res) => {
    usersCount = await UserManager.getCount();
    urlsCount = await UrlManager.getCount();
    urlsClickedCount = await UrlTracker.getCount();

    res.status(200).send({
        status: true,
        message: "success",
        data: { 
            usersCount: usersCount,
            urlsCount: urlsCount,
            urlsClicked: urlsClickedCount
        }
    });
})

module.exports = router;
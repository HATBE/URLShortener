const express = require("express");
const router = express.Router();

const UrlTracker = require("../classes/UrlTracker");
const UrlManager = require("../classes/UrlManager");
const UserManager = require("../classes/UserManager");

// -> get stats of the whole application
router.get('/', async (req, res) => {
    res.status(200).send({
        status: true,
        message: "Successfully received stats.",
        data: { 
            usersCount: await UserManager.getCount(),
            urlsCount: await UrlManager.getCount(),
            urlsClicked: await UrlTracker.getCount()
        }
    });
})

module.exports = router;
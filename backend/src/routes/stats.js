const express = require("express");
const router = express.Router();

const UserModel = require('../models/user');
const UrlModel = require('../models/url');

router.get('/', async (req, res) => {
    usersCount = await UserModel.count();
    urlsCount = await UrlModel.count();

    res.status(200).send({
        usersCount: usersCount,
        urlsCount: urlsCount,
        urlsClicked: 0
    });
})

module.exports = router;
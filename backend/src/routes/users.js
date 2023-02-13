const express = require("express");
const router = express.Router();

const Url = require('../classes/Url');

const mustAuthorize = require('../middleware/mustAuthorize');

// get loggedin user data
router.get('/', mustAuthorize, async (req, res) => {
    res.status(200).json({
        status: true, 
        message: "userdata received",
        data: {
            user: req.user.getAsObject()
        }
    });
});

// delete logged in user
router.delete('/', mustAuthorize, async (req, res) => {
    await Url.deleteAllUrlsFromUser(req.user.getId());
    await req.user.delete();
    res.status(200).json({
        status: true, 
        message: "user deleted",
    });
});

// delete logged in users urls
router.delete('/urls', mustAuthorize, async (req, res) => {
    await Url.deleteAllUrlsFromUser(req.user.getId());
    res.status(200).json({
        status: true, 
        message: "urls deleted",
    });
});

// change logged in users password
router.patch('/password', mustAuthorize, async (req, res) => {
    if(!req.body.oldpassword || !req.body.newpassword) {
        return res.status(400).json({status: false, message: "please provide a old and new password"});
    }

    const change = await req.user.changePassword(req.body.oldpassword, req.body.newpassword);

    if(!change.status) {
        // if password change failed
        return res.status(401).json({status: false, message: change.reason});
    }

    res.status(200).json({
        status: true, 
        message: "Password successfully changed",
    });
});

module.exports = router;
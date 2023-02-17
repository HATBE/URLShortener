const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userModel = require('../models/user');

const Url = require('../classes/Url');
const User = require('../classes/User');

const mustAuthorize = require('../middleware/mustAuthorize');
const onlyAdmin = require('../middleware/onlyAdmin');

// get a list of all users
router.get('/', mustAuthorize, onlyAdmin, async (req, res) => {
    const users = await User.getAll();
    res.status(200).json({
        status: true, 
        message: "users",
        data: {
            users: users
        }
    });
});

// delete a user
router.delete('/:id', mustAuthorize, async (req, res) => {
    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await userModel.exists({id: req.params.id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }
    
    const user = new User(await userModel.findOne({_id: req.params.id}))

    // if you are not logged in as the user and are no admin: then
    if((req.user.getId() !== user.getId() && !req.user.isAdmin())) {
        return res.status(404).json({status: false, message: "You are unauthorized!"});
    }

    // if user is an admin and wants to delete himself
    if(req.user.isAdmin() && req.user.getId() === user.getId()) {
        return res.status(404).json({status: false, message: "You can't delete yourself, your an admin!"});
    }
    
    await Url.deleteAllUrlsFromUser(req.params.id);

    await user.delete();

    res.status(200).json({
        status: true, 
        message: "Successfully deleted user",
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
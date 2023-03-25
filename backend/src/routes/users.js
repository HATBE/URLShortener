const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const UserModel = require('../models/user');
const UrlModel = require('../models/url');

const mustAuthorize = require('../middleware/mustAuthorize');
const onlyAdmin = require('../middleware/onlyAdmin');

const User = require('../classes/User');
const Url = require('../classes/Url');
const Validate = require("../classes/Validate");
const Pagination = require("../classes/Pagination");
const UrlManager = require("../classes/UrlManager");
const UserManager = require("../classes/UserManager");

// -> get a list of all users
// this list can only be retrieved by an admin
router.get('/', mustAuthorize, onlyAdmin, async (req, res) => {
    let {page} = req.query;

    if(!Validate.pageNumber(page)) {
        page = 1;
    }

    const pagination = new Pagination(page, await UserModel.find().count())

    // get a list of all users
    const users  = await UserModel.find(
        {}, 
        {}, 
        {
            limit: pagination.getLimit(), 
            skip: pagination.getSkip()
        }
    )
    .sort({isAdmin: -1, username: 1});

    if(!users) return false;

    let finalUsers = [];

    for (let i = 0; i < users.length; i++) {
        finalUsers.push((new User(users[i])).getAsObject());
    }

    res.status(200).json({
        status: true, 
        message: "successfully fetched all users",
        data: {
            users: finalUsers,
            pagination: pagination.getAsObject()
        }
    });
});

// -> get a user by his id
// this data can only be retrieved by an admin
router.get('/:id', mustAuthorize, onlyAdmin, async (req,res) => {
    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await UserModel.exists({_id: req.params.id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }

    const user = new User(await UserModel.findOne({_id: req.params.id}));

    return res.status(200).json({
        status: true, 
        message: "The user was found.",
        data: {
            user: user.getAsObject()
        }
    });
});

// -> get all urls from the loggedin user
router.get('/:id/urls', mustAuthorize, async (req, res) => {
    let {id} = req.params;
    let {page} = req.query;
 
    // if page is not valid e.g. string, not in range, ...
    if(!Validate.pageNumber(req.query.page)) {
        page = 1;
    }

    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await UserModel.exists({id: id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }

    const user = new User(await UserModel.findOne({_id: id}))

    // if you are not logged in as the user and are no admin: then
    if((req.user.getId() !== user.getId() && !req.user.isAdmin())) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
    }

    const pagination = new Pagination(page, await UrlModel.find({userid: user.getId()}).count())

    let urls = await UrlModel.find(
        {
            userid: user.getId()
        }, 
        {}, 
        {
            limit: pagination.getLimit(), 
            skip: pagination.getSkip()
        }
    )
    .sort( '-date' );

    if(!urls) return false;

    let newUrls = [];

    for (let i = 0; i < urls.length; i++) {
        newUrls.push(await (new Url(urls[i])).getAsObject());
    }

    res.status(200).json({
        status: true,
        message: "success",
        data: {
            urls: newUrls,
            pagination: pagination.getAsObject()
        }
    });
});

// -> change the password of a user by his id
router.patch('/:id/password', mustAuthorize, async (req, res) => {
    let {id} = req.params;
    let {newpassword, oldpassword} = req.body;

    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await UserModel.exists({id: id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }

    const user = new User(await UserModel.findOne({_id: id}))

    // if you are not logged in as the user and are no admin: then
    if((req.user.getId() !== user.getId() && !req.user.isAdmin())) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
    }

    let change = null;

    // bypass oldpassword if logged in as admin
    if(req.user.isAdmin()) {
        change = await UserManager.resetPassword(user, newpassword);
    } else {
        if((!oldpassword || !newpassword)) {
            return res.status(400).json({status: false, message: "please provide a old and new password"});
        }
        change = await UserManager.changePassword(user, oldpassword, newpassword);
    }
   
    if(!change.status) {
        // if password change failed
        return res.status(401).json({status: false, message: change.reason});
    }

    res.status(200).json({
        status: true, 
        message: "Successully changed your password.",
    });
});

// -> toggle the admin stats of a user by his id
// only a admin user can do this
router.patch('/:id/toggleadmin', mustAuthorize, onlyAdmin, async (req, res) => {
    let {id} = req.params;

    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await UserModel.exists({id: id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }

    const user = new User(await UserModel.findOne({_id: id}));

    // if user wants to toggle himself
    if(req.user.getId() === user.getId()) {
        return res.status(400).json({status: false, message: "You can't toggle admin state yourself, you are yourself!"});
    }

    let updatedUser = await UserModel.findByIdAndUpdate(id, {
        isAdmin: !user.isAdmin()
    });
    
    updatedUser = await updatedUser.save();

    res.status(200).json({
        status: true, 
        message: `Successfully set admin state to ${!user.isAdmin()}`,
    });
});

// -> delete all the urls of a user
router.delete('/:id/urls', mustAuthorize, async (req, res) => {
    let {id} = req.params;
    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await UserModel.exists({id: id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }

    const user = new User(await UserModel.findOne({_id: id}))

    // if you are not logged in as the user and are no admin: then
    if((req.user.getId() !== user.getId() && !req.user.isAdmin())) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
    }

    await UrlManager.deleteAllUrlsFromUser(user.getId());
    
    res.status(200).json({
        status: true, 
        message: "Successfully deleted your urls.",
    });
});

// -> delete a user by his id
router.delete('/:id', mustAuthorize, async (req, res) => {
    let {id} = req.params;
    // check id id is a valid mongoose id
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({status: false, message: "The id is not in a valid format!"});
    }

    // check if user exists
    if(!await UserModel.exists({id: id})) {
        return res.status(404).json({status: false, message: "This user was not found"});
    }
    
    const user = new User(await UserModel.findOne({_id: id}))

    // if you are not logged in as the user and are no admin: then
    if((req.user.getId() !== user.getId() && !req.user.isAdmin())) {
        return res.status(401).json({status: false, message: "You are unauthorized!"});
    }

    // if user is an admin and wants to delete himself
    if(req.user.isAdmin() && req.user.getId() === user.getId()) {
        return res.status(400).json({status: false, message: "You can't delete yourself, your an admin!"});
    }
    
    await UrlManager.deleteAllUrlsFromUser(id);

    await user.delete();

    res.status(200).json({
        status: true, 
        message: "Successfully deleted user",
    });
});

module.exports = router;
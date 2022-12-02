const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');

// register
router.post('/register', async (req, res) => {
    // check if username and password was provided
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({message: "failed, please provide a username and password"});
    }

    // check if username and pw are in range
    if(req.body.password < 1 || req.body.password > 1024 || req.body.username < 3 || req.body.username > 16) {
        return res.status(400).json({message: "failed, username or password not in range"});
    }

    // check if user already exists
    if(await UserModel.exists({username: req.body.username})){
        return res.status(400).json({message: "username already exists"});
    }

    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // hash password

    // create new user with mongoose
    const user = new UserModel({
        username: req.body.username,
        password: hashedPassword
    });

    const result = await user.save(); // save user

    const {username, _id} = await result.toJSON();

    res.status(201).json({message: "successfully, created user", user: {
        username: username,
        id: _id
    }})
});

// login
router.post('/login', async (req, res) => {
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({message: "failed, please provide a username and password"});
    }

    // check if user exist
    if(!await UserModel.exists({username: req.body.username})) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const user = await UserModel.findOne({username: req.body.username});

    // check if stored pw and given pw match
    if(!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const tokenData = {id: user._id};
    const signedToken = jwt.sign(tokenData, process.env.JWT_SECRET); // sign token

    // set jwt cookie
    res.cookie('authtoken', signedToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({message: "successfully loggedin"});
});

// logout
router.post('/logout', (req, res) => {
    res.cookie('authtoken', '', {
        maxAge: 0
    });

    res.status(200).json({message: "successfully loggedout"});
});

// get loggedin user data
router.get('/user', async (req, res) => {
    // check if auth cookie isset
    if(!req.cookies['authtoken']) {
        return res.status(401).json({message: 'Unauthenticated'});
    }

    const cookie = req.cookies['authtoken'];

    const claims = jwt.verify(cookie, process.env.JWT_SECRET);

    if(!claims) {
        return res.status(401).json({message: 'Unauthenticated'});
    }

    const user = await UserModel.findOne({_id: claims.id});

    const {_id, username} = await user.toJSON();

    res.status(200).json({
        user: {
            id: _id,
            username: username
        }
    });
});

module.exports = router;

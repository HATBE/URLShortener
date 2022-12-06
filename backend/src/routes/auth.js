const express = require("express");
const router = express.Router();

const Validate = require('../classes/Validate');
const Auth = require('../classes/Auth')
const User = require('../classes/User')

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

    const {username, _id} = result.toJSON();

    res.status(201).json({message: "successfully, created user", user: {
        username: username,
        id: _id
    }});
    console.log(`[AUTH] user "${username}" registered successfully.`);
});

// login
router.post('/login',  (req, res) => {
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({message: "failed, please provide a username and password"});
    }

    Auth.tryLogin(req.body.username, req.body.password)
    .then(login => {
        if(!login) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        res.cookie('authtoken', login, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        
        res.status(200).json({message: "successfully loggedin"});
    });
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

    const {_id, username} = user.toJSON();

    res.status(200).json({
        user: {
            id: _id,
            username: username
        }
    });
});

router.get('/test', (req,res) => {
    Auth.getUserFromCookie(req.cookies)
    .then((user) => {
        if(user) {
            console.log(user.getId())
        } else {
            console.log(user)
        }
    });

    res.status(200).json({
        message: "ok"
    });
});

module.exports = router;
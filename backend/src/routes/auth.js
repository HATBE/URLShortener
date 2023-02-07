const express = require("express");
const router = express.Router();

const Validate = require('../classes/Validate');
const User = require('../classes/user');
const Auth = require('../classes/Auth');

const mustAuthorize = require('../middleware/mustAuthorize');

// register
router.post('/register', async (req, res) => {
    // check if username and password was provided
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({message: "please provide a username and password"});
    }

    const rUsername = req.body.username;
    const rPassword = req.body.password;

    // check if username and pw are in range
    if(!Validate.username(rUsername) || !Validate.password(rPassword)) {
        return res.status(400).json({message: "username or password not in range"});
    }

    const register = await Auth.register(rUsername, rPassword);

    if(!register.status) {
        console.log(`[AUTH] user "${rUsername}" failed to register.`);
        return res.status(400).json({message: register.reason});
    }
    
    console.log(`[AUTH] user "${rUsername}" registered successfully.`);
    return res.status(201).json({message: "successfully, created user", user: {
        username: register.user.getUsername(),
        id: register.user.getId()
    }});
});

// login
router.post('/login', async (req, res) => {
    // check if inputs are as required
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({status: false, message: "please provide a username and password"});
    }

    // login
    const login = await Auth.login(res, req.body.username, req.body.password);
    
    if(!login.status) {
        // if login failed
        return res.status(401).json({status: false, message: "Invalid credentials"});
    }

    res.status(200).json({status: true, data: {token: login.token}, message: "successfully loggedin"});
});

// get loggedin user data
router.get('/user', mustAuthorize, async (req, res) => {
    res.status(200).json({user: req.user.getAsObject()});
});

// Test route, only for DEBUG!
router.get('/test', (req,res) => {
    res.status(404).json({
        message: "404"
    });
});

module.exports = router;
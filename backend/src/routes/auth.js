const express = require("express");
const router = express.Router();

const Validate = require('../classes/Validate');
const Auth = require('../classes/Auth');

// register
router.post('/register', async (req, res) => {
    // check if username and password was provided
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({status: false, message: "please provide a username and password"});
    }

    const rUsername = req.body.username;
    const rPassword = req.body.password;

    // check if username and pw are in range
    if(!Validate.username(rUsername) || !Validate.password(rPassword)) {
        return res.status(400).json({status: false, message: "username or password not in range"});
    }

    const register = await Auth.register(rUsername, rPassword);

    if(!register.status) {
        console.log(`[AUTH] user "${rUsername}" failed to register.`);
        return res.status(400).json({status: false, message: register.reason});
    }
    
    console.log(`[AUTH] user "${rUsername}" registered successfully.`);
    return res.status(201).json({
        status: true, 
        message: "successfully, created user", 
        data: {
            username: register.user.getUsername(),
            id: register.user.getId()
        }
    });
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

    res.status(200).json({
        status: true, 
        message: "successfully loggedin",
        data: {
            token: login.token
        }, 
    });
});

module.exports = router;
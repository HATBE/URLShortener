const express = require("express");
const router = express.Router();

const Validate = require('../classes/Validate');
const Auth = require('../classes/Auth');
const User = require('../classes/User');

const mustAuthorize = require('../middleware/mustAuthorize');

// -> get data of the currently loggedin user
router.get('/loggedin', mustAuthorize, async (req, res) => {
    res.status(200).json({
        status: true, 
        message: "userdata received",
        data: {
            user: req.user.getAsObject()
        }
    });
});

// -> register as a new user
router.post('/register', async (req, res) => {
    let {password, username} = req.body;

    // check if username and password was provided
    if(!password || !username) {
        return res.status(400).json({status: false, message: "Please provide a username and password"});
    }

    // check if username and pw are in range
    if(!Validate.username(username) || !Validate.password(password)) {
        return res.status(400).json({status: false, message: "Username or password not in range"});
    }

    const register = await Auth.register(username, password);

    if(!register.status) {
        console.log(`[AUTH] user "${username}" failed to register.`);
        return res.status(400).json({status: false, message: register.reason});
    }
    
    console.log(`[AUTH] user "${username}" registered successfully.`);
    return res.status(201).json({
        status: true, 
        message: "Successfully, created user", 
        data: {
            user: register.user.getAsObject()
        }
    });
});

// -> login as a new user
router.post('/login', async (req, res) => {
    let {password, username} = req.body;

    // check if inputs are as required
    if(!password || !username) {
        return res.status(400).json({status: false, message: "please provide a username and password"});
    }

    // login
    const login = await Auth.login(res, username, password);
    
    if(!login.status) {
        // if login failed
        return res.status(401).json({status: false, message: "Invalid credentials"});
    }

    const user = new User(login.user);

    res.status(200).json({
        status: true, 
        message: "successfully loggedin",
        data: {
            token: login.token,
            user: user.getAsObject()
        }, 
    });
});

module.exports = router;
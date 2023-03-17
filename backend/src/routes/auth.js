const express = require("express");
const router = express.Router();

const Validate = require('../classes/Validate');
const Auth = require('../classes/Auth');

const mustAuthorize = require('../middleware/mustAuthorize');

// -> get data of the currently loggedin user
router.get('/loggedin', mustAuthorize, async (req, res) => {
    res.status(200).json({
        status: true, 
        message: "Successfully received the data of the currently loggedin user.",
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
        return res.status(400).json({status: false, message: "Please provide a username and a password!"});
    }

    // check if the format of the username is valid
    if(!Validate.username(username)) {
        return res.status(400).json({status: false, message: "The username is in a wrong format!"});
    }

    // check if the format of the password is valid
    if(!Validate.password(password)) {
        return res.status(400).json({status: false, message: "The password is in a wrong format!"});
    }

    const registerAttempt = await Auth.register(username, password);

    // if register failed, throw error
    if(!registerAttempt.status) {
        console.log(`[AUTH] THe user "${username}" failed to register! Reason: ${registerAttempt.reason}`);
        return res.status(400).json({status: false, message: registerAttempt.reason});
    }
    
    console.log(`[AUTH] The user "${username}" registered successfully.`);

    return res.status(201).json({
        status: true, 
        message: `Successfully created the user "${username}".`, 
        data: {
            user: registerAttempt.user.getAsObject()
        }
    });
});

// -> login as a new user
router.post('/login', async (req, res) => {
    let {password, username} = req.body;

    // check if inputs are as required
    if(!password || !username) {
        return res.status(400).json({status: false, message: "Please provide a username and a password!"});
    }

    // login
    const loginAttempt = await Auth.login(username, password);
    
    if(!loginAttempt.status) {
        // if login failed
        console.log(`[AUTH] The user "${username}" failed to login! Reason: ${loginAttempt.reason}`);
        return res.status(401).json({status: false, message: "Invalid credentials!"}); // DON'T USE loginAttempt.reason here (ONLY PRINT TO LOGS)!!!!!! (for security reasons)
    }

    console.log(`[AUTH] The user "${username}" loggedin successfully.`); // write successful login to log

    res.status(200).json({
        status: true, 
        message: "Successfully loggedin.",
        data: {
            token: loginAttempt.token,
            user: loginAttempt.user.getAsObject()
        }, 
    });
});

module.exports = router;
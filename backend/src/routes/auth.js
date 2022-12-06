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
        return res.status(400).json({message: "please provide a username and password"});
    }

    const rUsername = req.body.username;
    const rPassword = req.body.password;

    // check if username and pw are in range
    if(rPassword.length < 1 || rPassword.length > 1024 || rUsername.length < 3 || rUsername.length > 16) {
        return res.status(400).json({message: "username or password not in range"});
    }

    Auth.register(rUsername, rPassword)
    .then(register => {
        if(register.state) {
            console.log(`[AUTH] user "${rUsername}" registered successfully.`);
            return res.status(201).json({message: "successfully, created user", user: {
                username: register.user.getUsername(),
                id: register.user.getId()
            }});
        } else {
            console.log(`[AUTH] user "${rUsername}" failed to register.`);
            return res.status(400).json({message: register.reason});
        }
    });
});

// login
router.post('/login',  (req, res) => {
    // check if inputs are as required
    if(!req.body.password || !req.body.username) {
        return res.status(400).json({message: "please provide a username and password"});
    }

    // login
    Auth.login(res, req.body.username, req.body.password)
    .then(login => {
        if(!login) {
            return res.status(401).json({message: "Invalid credentials"});
        }
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
      // login
      Auth.getUserFromCookie(req.cookies)
      .then(user => {
          if(!user) {
              return res.status(401).json({message: "unauthorized"});
          }
          res.status(200).json({user: user.getAsModel()});
      });
});


// Test route, only for DEBUG!
router.get('/test', (req,res) => {
    res.status(404).json({
        message: "404"
    });
});

module.exports = router;
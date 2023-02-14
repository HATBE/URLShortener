const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const User = require('./User');

class Auth {
    static async login(res, username, password) {
        if(!await UserModel.exists({username: username})) {
            // if user does not exist
            return {status: false};
        }

        const user = await UserModel.findOne({username: username});

        // compare passwords (submited and from db), if they dont match, return
        if(!await bcrypt.compare(password, user.password)) {
            console.warn(`[AUTH] The user "${username}" failed to login. reason: wrong password!`); // write failed login to log
            return {status: false};
        }
        
        const tokenData = {id: user._id};   // write token data
        const signedToken = jwt.sign(       // sign token
            tokenData, 
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.LOGIN_EXPIRES_IN || '1d',
            }
        ); 

        console.log(`[AUTH] The user "${username}" loggedin successfully.`); // write successful login to log

        return {status: true, token: signedToken, user: user};
    }

    static async register(username, password) {
        // if user already exists, return
        if(await UserModel.exists({username: username})){
            return {status: false, reason: "This username is already taken!"};
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // hash password
    
        // create new user (write it to database)
        const user = new UserModel({
            username: username,
            password: hashedPassword
        });

        const result = await user.save(); // save user
        
        return {status: true, user: new User(result)}
    }
}

module.exports = Auth;
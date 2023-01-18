const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const User = require('./User');

class Auth {
    static async login(res, username, password) {
        if(!await UserModel.exists({username: username})) {
            return false;
        }

        const user = await UserModel.findOne({username: username});

        // compare passwords (submited and from db), if they dont match, return
        if(!await bcrypt.compare(password, user.password)) {
            console.warn(`[AUTH] user "${username}" failed to login. reason: wrong password!`);
            return false;
        }
        
        const tokenData = {id: user._id}; // write token data
        const signedToken = jwt.sign(tokenData, process.env.JWT_SECRET); // sign token

        console.log(`[AUTH] user "${username}" loggedin successfully.`);
        
        // set auth cookie
        res.cookie('authtoken', signedToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return true;
    }

    static async register(username, password) {
        // if user already exists, return
        if(await UserModel.exists({username: username})){
            return {state: false, reason: "Username already exists"};
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // hash password
    
        // create new user (write it to database)
        const user = new UserModel({
            username: username,
            password: hashedPassword
        });

        const result = await user.save(); // save user
        
        return {state: true, user: new User(result)}
    }
}

module.exports = Auth;
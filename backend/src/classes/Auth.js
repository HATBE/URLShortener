const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const User = require('./User');

class Auth {
    static async getUserFromCookie(cookies) {
        if(!cookies['authtoken']) {
            return null;
        }

        const cookie = cookies['authtoken'];
        const claim = jwt.verify(cookie, process.env.JWT_SECRET);

        if(!claim) {
            return null;
        }

        const user = await UserModel.findOne({_id: claim.id});

        return new User(user);
    }

    static async tryLogin(username, password) {
        if(!await UserModel.exists({username: username})) {
            return false;
        }

        const user = await UserModel.findOne({username: username});

        if(!await bcrypt.compare(password, user.password)) {
            console.warn(`[AUTH] user "${username}" failed to login. reason: wrong password!`);
            return false;
        }
        
        const tokenData = {id: user._id};
        const signedToken = jwt.sign(tokenData, process.env.JWT_SECRET); // sign token

        console.log(`[AUTH] user "${username}" loggedin successfully.`);
        return signedToken;
    }
}

module.exports = Auth;
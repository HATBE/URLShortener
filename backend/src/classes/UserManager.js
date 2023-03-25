const User = require('./User');
const Validate = require('./Validate');

const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');

class UserManager {
    static async create(username, password) {
        // build new user
        let user = await new UserModel({
            username: username,
            password: password,
            isAdmin: false
        });

        user = await user.save();

        return new User(user); // save user
    }

    static async getCount() {
        return await UserModel.count();
    }

    static async changePassword(user, oldpassword, newpassword) {
        // check if old password matches
        if(!await user.comparePasswords(oldpassword)) {
            return {status: false, reason: "Old password wrong"};
        }

        if(!Validate.password(newpassword)) {
            return {status: false, reason: "Password not in range"};
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(newpassword, salt); // hash password
        
        let updatedUser = await UserModel.findByIdAndUpdate(user.getRawId(), {
            password: hashedPassword
        });

        updatedUser = await updatedUser.save();

        return {status: true};
    }

     static async resetPassword(user, newpassword) {
        if(!Validate.password(newpassword)) {
            return {status: false, reason: "Password not in range"};
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(newpassword, salt); // hash password

        let updatedUser = await UserModel.findByIdAndUpdate(user.getRawId(), {
            password: hashedPassword
        });
        
        updatedUser = await updatedUser.save(); 

        return {status: true};
    }
    
    static async getFromId(id) {
        const user = await UserModel.findOne({_id: id});
        
        if(!user) return false;
        return new User(user);
    }

    static async getFromUsername(username) {
        const user = await UserModel.findOne({username: username});
        if(!user) return false;
        return new User(user);
    }

    static async usernameExists(username) {
        return await UserModel.exists({username: username});
    }
}

module.exports = UserManager;

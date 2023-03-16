const User = require('./User');
const Validate = require('./Validate');

const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');

class UserManager {
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

        const update = await UserModel.findByIdAndUpdate(user.getRawId(), {
            password: hashedPassword
        });

        const result = await update.save(); // save user

        return {status: true};
    }

     static async resetPassword(user, newpassword) {
        if(!Validate.password(newpassword)) {
            return {status: false, reason: "Password not in range"};
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(newpassword, salt); // hash password

        const update = await UserModel.findByIdAndUpdate(user.getRawId(), {
            password: hashedPassword
        });

        const result = await update.save(); // save user

        return {status: true};
    }

    
    static async getFromId(id) {
        const user = await UserModel.findOne({_id: id});
        if(!user) return false;
        return new User(user);
    }
}

module.exports = UserManager;

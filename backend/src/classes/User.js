const UserModel = require('../models/user');
const UrlModel = require('../models/url');
const bcrypt = require('bcryptjs');
const Validate = require('../classes/Validate');
const jwt = require('jsonwebtoken');

class User {
    #id;
    #username;
    #password;

    static async getCount() {
        return await UserModel.count();
    }
    
    static async getFromId(id) {
        const user = await UserModel.findOne({_id: id});
        if(!user) return false;
        return new User(user);
    }

    constructor(user) {
        user = user.toJSON();

        this.#id = user._id;
        this.#username = user.username;
        this.#password = user.password;
    }

    getRawId() {
        return this.#id;
    }

    getId() {
        return JSON.stringify(this.#id).replace(/['"]+/g, ''); // mongose ids are objects :(
    }

    getUsername() {
        return this.#username;
    }

    async delete() {
        // delete user, all urls and trackers from user
        await this.deleteAllUrls();
        await UserModel.deleteOne({_id: this.getRawId()});
        return true;
    }

    async changePassword(oldpassword, newpassword) {
        // check if old password matches
        if(!await this.comparePasswords(oldpassword)) {
            return {status: false, reason: "Old password wrong"};
        }

        if(!Validate.password(newpassword)) {
            return {status: false, reason: "Password not in range"};
        }

        const salt = await bcrypt.genSalt(10); // generate salt
        const hashedPassword = await bcrypt.hash(newpassword, salt); // hash password

        const update = await UserModel.findByIdAndUpdate(this.getRawId(), {
            password: hashedPassword
        });

        const result = await update.save(); // save user

        return {status: true};
    }

    getAsObject() {
        return {
            id: this.getId(),
            username: this.getUsername()
        }
    }

    async comparePasswords(password) {
        if(!await bcrypt.compare(password, this.#password)) {
            return false
        }
        return true;
    }
}

module.exports = User;
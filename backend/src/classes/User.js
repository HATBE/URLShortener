const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const Validate = require('../classes/Validate');

class User {
    #id;
    #username;
    #password;
    #isAdmin;

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

    static async getAll() {
        let finalUsers = [];
        const users = await UserModel.find();
        if(!users) return false;
        users.forEach(user => {
            finalUsers.push(new User(user).getAsObject());
        });
        finalUsers.sort(user => {if(user.isAdmin)  return -1}); // list admin at the beginning
        return finalUsers;
    }

    constructor(user) {
        user = user.toJSON();

        this.#id = user._id;
        this.#username = user.username;
        this.#password = user.password;
        this.#isAdmin = user.isAdmin;
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

    isAdmin() {
        return this.#isAdmin;
    }

    async delete() {
        // delete user
        await UserModel.deleteOne({_id: this.getRawId()});
        return true;
    }

    getAsObject() {
        return {
            id: this.getId(),
            username: this.getUsername(),
            isAdmin: this.isAdmin()
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
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

class User {
    #id;
    #username;
    #password;
    #isAdmin;

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
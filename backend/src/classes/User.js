const UserModel = require('../models/user');

class User {
    #id;
    #username;

    constructor(user) {
        user = user.toJSON();
        this.#username = user.username;
        this.#id = JSON.stringify(user._id).replace(/['"]+/g, '');
    }

    getId() {
        return this.#id;
    }

    getUsername() {
        return this.#username;
    }

    getAsModel() {
        return {
            id: this.getId(),
            username: this.getUsername()
        }
    }
}

module.exports = User;
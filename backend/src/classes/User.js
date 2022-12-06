const UserModel = require('../models/user');

class User {
    #id;
    #username;

    constructor(user) {
        switch ((typeof user)) {
            case 'object':
                user = user.toJSON();
                this.#id = JSON.stringify(user._id).replace(/['"]+/g, ''); // mongose ids are objects :(
                this.#username = user.username;
                break;
            case 'string':
                // TODO: get from id
                break;
            default:
                return null;
        }
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
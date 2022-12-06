class Validate {
    static validatePassword(password) {
        // check if password is in range
        if(password < 6 || password > 1024) {
           return false;
        }
        return true;
    }

    static validateUsername(username) {
        // check if username is in range
        if(username < 3 || username > 16) {
            return false;
        }
        return true;
    }
}

module.exports = Validate;
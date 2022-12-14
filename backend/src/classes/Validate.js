class Validate {
    static password(password) {
        // check if password is in range
        if(password.length < 6 || password.length > 1024) {
           return false;
        }
        return true;
    }

    static username(username) {
        // check if username is in range
        if(username.length < 3 || username.length > 16) {
            return false;
        }
        return true;
    }

    static url(url) {
        // check if url is valid
        if(!/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url)) {
           return false;
        }
        // check if url is in range
        if(url.length < 1 || url > 2048) {
            return false;
        }
        return true;
    }
}

module.exports = Validate;
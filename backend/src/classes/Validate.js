class Validate {
    static password(password) {
        // check if password is in range
        if(password.length < 6 || password.length > 1024) {
           return false;
        }
        return true;
    }

    static username(username) {
        // check if url is valid
        if(!new RegExp(/^[A-Za-z0-9]*$/).test(username)) {
            return false;
        }
        // check if username is in range
        if(username.length < 3 || username.length > 16) {
            return false;
        }
        return true;
    }

    static url(url) {
        // check if url is valid
        if(!new RegExp(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(url)) {
           return false;
        }
        // check if url is in range
        if(url.length < 1 || url > 2048) {
            return false;
        }
        return true;
    }

    static pageNumber(number) {
        if(typeof number != "string") {
            return false
        }  
        
        if(isNaN(number)) {
            return false;
        }

        if(number <= 0) {
            return false;
        }
        return true;
    }
}

module.exports = Validate;
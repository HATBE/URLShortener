const UrlModel = require('../models/url');

class User {
    #id;
    #url;
    #shorturl;
    #date;
    #userid;

    constructor(url) {
        url = url.toJSON();

        this.#id = JSON.stringify(url._id).replace(/['"]+/g, ''); // mongose ids are objects :(
        this.#url = url.url;
        this.#shorturl = url.shorturl;
        this.#date = url.date;
        this.#userid = url.userid;
    }

    getId() {
        return this.#id;
    }

    getUrl() {
        return this.#url;
    }

    getShorturl() {
        return this.#shorturl;
    }

    getDate() {
        return this.#date;
    }

    /*getUser() {
        return new User(this.#userid);
    }*/

    getAsModel() {
        return {
            id: this.getId(),
            url: this.getUrl(),
            shorturl: this.getShorturl(),
            date: this.getDate(),
            /* user: this.getUser()*/
        }
    }
}

module.exports = User;
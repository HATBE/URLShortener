const UrlModel = require('../models/url');
const UrlTrackerModel = require('../models/urlTracker');

const UrlTracker = require('./UrlTracker');
const UserManager = require('./UserManager');

class Url {
    #id;
    #url;
    #shorturl;
    #date;
    #userid;

    constructor(url) {
        url = url.toJSON();

        this.#id = url._id;
        this.#url = url.url;
        this.#shorturl = url.shorturl;
        this.#date = url.date;
        this.#userid = url.userid;
    }

    getId() {
        return JSON.stringify(this.#id).replace(/['"]+/g, ''); // mongose ids are objects :(
    }

    getRawId() {
        return this.#id
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

    async getUser() {
        return await UserManager.getFromId(this.#userid);
    }

    async getStats() {
        return {
            clicked: await UrlTracker.getCountFromUrl(this.getRawId())
        }
    }

    async delete() {
        await UrlTrackerModel.deleteMany({url: this.getRawId()}); // delete all trackers
        await UrlModel.deleteOne({_id: this.getRawId()}); // delete url

        return true;
    }

    async getAsObject() {
        const user = await this.getUser();
        return {
            id: this.getId(),
            url: this.getUrl(),
            shorturl: this.getShorturl(),
            date: this.getDate(),
            user: user ? user.getAsObject() : null
        }
    }
}

module.exports = Url;
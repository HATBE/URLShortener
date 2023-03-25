const UrlTrackerModel = require('../models/urlTracker');

class UrlTracker {
    #id;
    #url;
    #date;
    #ip;

    static async getCount() {
        return await UrlTrackerModel.count();
    }

    static async create(urlId, ip) {
        let urlTracker = new UrlTrackerModel({
            url: urlId,
            date: Math.round(Date.now() / 1000),
            ip: (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') ? 'localhost' : ip // if access comes from home address, enter localhost as a string
        });

        urlTracker = await urlTracker.save();

        return urlTracker;
    }

    static async getCountFromUrl(url) {
        return await UrlTrackerModel.find({url: url}).count();
    }

    constructor(urlTracker) {
        urlTracker = urlTracker.toJSON();

        this.#id = JSON.stringify(urlTracker._id).replace(/['"]+/g, ''); // mongose ids are objects :(
        this.#url = urlTracker.url;
        this.#date = urlTracker.date;
        this.#ip = urlTracker.ip;
    }

    getId() {
        return this.#id;
    }

    getUrl() {
        return this.#url;
    }

    getDate() {
        return this.#date;
    }

    getIp() {
        return this.#ip;
    }

    async getAsObject() {
        return {
            id: this.getId(),
            url: this.getUrl(),
            date: this.getDate(),
            ip: this.getIp()
        }
    }
}

module.exports = UrlTracker;
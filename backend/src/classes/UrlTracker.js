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
        const urlTracker = new UrlTrackerModel({
            url: urlId,
            date: Math.round(Date.now() / 1000),
            ip: ip
        });

        const save = await urlTracker.save();

        return save;
    }

    constructor(urlTracker) {
        urlTracker = url.toJSON();

        this.#id = JSON.stringify(url._id).replace(/['"]+/g, ''); // mongose ids are objects :(
        this.#url = url.url;
        this.#date = url.date;
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
        const user = await this.getUser();
        return {
            id: this.getId(),
            url: this.getUrl(),
            date: this.getDate(),
            ip: this.getIp()
        }
    }
}

module.exports = UrlTracker;
const UrlModel = require('../models/url');
const UrlTrackerModel = require('../models/urlTracker');
const randomString = require('randomString');

const User = require('./User');
const UrlTracker = require('./UrlTracker');

class Url {
    #id;
    #url;
    #shorturl;
    #date;
    #userid;

    static async getCount() {
        return await UrlModel.count();
    }

    static async getFromShorturl(shorturl) {
        const url = await UrlModel.findOne({shorturl: shorturl});
        if(!url) return false; 
        return new Url(url);
    }

    static async getFromId(id) {
        const url = await UrlModel.findOne({_id: id});
        if(!url) return false;
        return new Url(url);
    }
    
    static async create(rUrl, user) {
        let shorturl;
        let rep = false;
        do {
            // generate new shorturl, check if it already exists in db, if exists, repeat
            shorturl = randomString.generate({
                length: +process.env.SHORTURL_LENGTH || 9
            });
    
            const result = await UrlModel.exists({shorturl: shorturl})
            if(result) rep = true;
        } while(rep);

        // build urlmodel
        const url = new UrlModel({
            url: rUrl,
            shorturl: shorturl,
            date: Math.round(Date.now() / 1000),
            userid: user ? user.getId() : null || null
        });

         // save urlmodel
        const save = await url.save();

        return new Url(save);
    }

    static async deleteForUser(shorturl, user) {
        // check if url exists
        if(!await UrlModel.exists({shorturl: shorturl})) {
            return {state: false, reason: "url was not found"}
        }

        // check if user has access to url
        if(!await UrlModel.exists({shorturl: shorturl, userid: user.getId()})) {
            return {state: false, reason: 'you don\'t have access to this url'}
        }

        const url = await Url.getFromShorturl(shorturl);
        
        url.delete();

        return {state: true, message: 'success'}
    }

    static async deleteAllUrlsFromUser(userid) {
        // delete all urls + tracker from a user
        const urls = await UrlModel.find({userid: userid});
        urls.forEach(async url => {
            const cUrl = await Url.getFromId(url._id);
            cUrl.delete();
        });
    }

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
        return await User.getFromId(this.#userid);
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
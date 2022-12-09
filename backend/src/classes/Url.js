const UrlModel = require('../models/url');
const User = require('./User');
const randomString = require('randomString');

class Url {
    #id;
    #url;
    #shorturl;
    #date;
    #userid;

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
                length: 9
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

    static async delete(shorturl, user) {
        // check if url exists
        if(!await UrlModel.exists({shorturl: shorturl})) {
            return {state: false, reason: "url was not found"}
        }

        // check if user has access to url
        if(!await UrlModel.exists({shorturl: shorturl, userid: user.getId()})) {
            return res.status(404).json({message: "you don't have access to this url"});
        }

        const result = await UrlModel.deleteOne({shorturl: shorturl});

        return {state: true, message: 'success'}
    }

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

    getUser() {
        return User.getFromId(this.#userid);
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
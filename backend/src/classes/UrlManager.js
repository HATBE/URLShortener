const Url = require('./Url');

const UrlModel = require('../models/url');

const randomString = require('randomString');

class UrlManager {
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

    static async create(url, user) {
        let shorturl;
        let rpt = false;

        do {
            // generate new shorturl, check if it already exists in db, if exists, repeat
            shorturl = randomString.generate({
                length: +process.env.SHORTURL_LENGTH || 9
            });
    
            if(await UrlManager.shorturlExists(shorturl)) {
                rpt = true;
            }
        } while(rpt);

        // build urlmodel
        let newUrl = await new UrlModel({
            url: url,
            shorturl: shorturl,
            date: Math.round(Date.now() / 1000),
            userid: user ? user.getId() : null || null
        });
        
        newUrl = await newUrl.save();
        
        return new Url(newUrl);
    }

    static async deleteForUser(shorturl, user) {
        // check if url exists
        if(!await UrlModel.exists({shorturl: shorturl})) {
            return {state: false, reason: "Url was not found"}
        }

        // check if user has access to url
        if(!await UrlModel.exists({shorturl: shorturl, userid: user.getId()})) {
            return {state: false, reason: 'You don\'t have access to this url'}
        }

        const url = await UrlManager.getFromShorturl(shorturl);
        
        url.delete();

        return {state: true, message: 'success'}
    }

    static async deleteAllUrlsFromUser(userid) {
        // delete all urls + tracker from a user
        const urls = await UrlModel.find({userid: userid});
        urls.forEach(async url => {
            const cUrl = await UrlManager.getFromId(url._id);
            cUrl.delete();
        });
    }

    static async shorturlExists(shorturl) {
        return await UrlModel.exists({shorturl: shorturl});
    }
}

module.exports = UrlManager;
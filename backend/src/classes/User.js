const UserModel = require('../models/user');
const UrlModel = require('../models/url');
const Url = require('./Url');
const jwt = require('jsonwebtoken');

class User {
    #id;
    #username;

    static async getCount() {
        return await UserModel.count();
    }

    static async getFromCookie(cookies) {
        if(!cookies['authtoken']) {
            return null;
        }

        const cookie = cookies['authtoken'];
        const claim = jwt.verify(cookie, process.env.JWT_SECRET);

        if(!claim) {
            return null;
        }

        const user = await UserModel.findOne({_id: claim.id});

        return new User(user);
    }

    static async getFromId(id) {
        const user = await UserModel.findOne({_id: id});
        if(!user) return false;
        return new User(user);
    }

    constructor(user) {
        user = user.toJSON();
        this.#id = user._id;
        this.#username = user.username;
    }

    getId() {
        return JSON.stringify(this.#id).replace(/['"]+/g, ''); // mongose ids are objects :(
    }

    getUsername() {
        return this.#username;
    }

    async getUrls() { 
        let urls = await UrlModel.find({userid: this.getId()});
        
        let date = Math.round(Date.now() / 1000);
        urls.sort(url => {if(url.date < date) return -1});

        let newUrls = [];

        urls.forEach(url => {
            let a = Url.getFromId(url._id);
            newUrls.push(a.getAsObject());
        })

        return newUrls;
    }

    getAsObject() {
        return {
            id: this.getId(),
            username: this.getUsername()
        }
    }
}

module.exports = User;
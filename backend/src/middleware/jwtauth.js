const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const User = require('../classes/User');

async function authJwt(req, res, next) {
    if(!req.headers['authorization']) {
        req.user = null;
        return next();
    }

    if(req.headers['authorization'].split(' ')[1] == "null") {
        req.user = null;
        return next();
    }

    const bearerToken = req.headers['authorization'].split(' ')[1];

    if(!bearerToken) {
        // no token, failed
        req.user = null;
        return next();
    }

    let claim
    try {
        claim = jwt.verify(bearerToken, process.env.JWT_SECRET)
    } catch (error) {
        // token cannot be verified, maybe malformed
        return res.status(401).json({status: false, message: "You are not authorized!"});
    }

    if(!claim) {
        // claim failed
        req.user = null;
        return next();
    }

    const user = await UserModel.findOne({_id: claim.id});

    if(!user) {
        // no user with this id found (maybe the user was deleted after the login?)
        req.user = null;
        return next();
    }

    req.user = new User(user);
    next();
}

module.exports = authJwt;
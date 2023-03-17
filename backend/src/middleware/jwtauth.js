const jwt = require('jsonwebtoken');

const User = require('../classes/User');
const UserManager = require('../classes/UserManager');

async function authJwt(req, res, next) {
    if(!req.headers['authorization']) {
        // if the authorization header is not set, the user is not logged in
        req.user = null;
        return next();
    }

    const bearerToken = req.headers['authorization'].split(' ')[1];

    if(!bearerToken || bearerToken == "null") {
        // if the token is falsy or null, the user is not logged in
        req.user = null;
        return next();
    }

    let claim;

    try {
        claim = jwt.verify(bearerToken, process.env.JWT_SECRET);
    } catch (error) {
        // the token cannot be verified (maybe malformed, expired?), the user is not logged in (exact error is in error.message)
        // don't execute next(), because this is an error and the user is not just not logged in
        return res.status(401).json({status: false, message: "You are not authorized!", detail: error.message});
    }

    if(!claim) {
        // if the claim failed, the user is not logged in
        req.user = null;
        return next();
    }
    
    const user = await UserManager.getFromId(claim.id); // get user from id saved in token / claim

    if(!user) {
        // no user with this id was found (maybe the user was deleted while the token is still valid?), the user is not logged in
        req.user = null;
        return next();
    }

    req.user = user; // set the loggedin backend user to the user class with the loggedin user id

    return next();
}

module.exports = authJwt;
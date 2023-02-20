const jwt = require('jsonwebtoken');

const User = require('../classes/User');

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
        // the token cannot be verified (maybe malformed, expired?), the user is not logged in
        return res.status(401).json({status: false, message: "You are not authorized!", detail: error.message});
    }

    if(!claim) {
        // if the claim failed, the user is not logged in
        req.user = null;
        return next();
    }

    const user = await User.getFromId(claim.id);

    if(!user) {
        // no user with this id found (maybe the user was deleted while the token is still valid?), the user is not logged in
        req.user = null;
        return next();
    }

    req.user = user; // set the loggedin backend user to the userclass with the loggedin user id

    return next();
}

module.exports = authJwt;
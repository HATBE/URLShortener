const jwt = require('jsonwebtoken');

async function mustAuthorize(req, res, next) {
    if(!req.headers['authorization']) {
        return res.status(401).json({status: false, message: "You are not authorized!"});
    }

    const bearerToken = req.headers['authorization'].split(' ')[1];

    if(!bearerToken) {
        // no token, failed
        return res.status(401).json({status: false, message: "You are not authorized!"});
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
        return res.status(401).json({status: false, message: "You are not authorized!"});
    }

    if(req.user === null) {
        // if user was deleted or not valid
        return res.status(401).json({status: false, message: "You are not authorized!"});
    }

    next();
}

module.exports = mustAuthorize;
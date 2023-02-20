async function mustAuthorize(req, res, next) {
    if(!req.user) {
        // if no user is defined, the user is not logged in
        return res.status(401).json({status: false, message: "You are not authorized!"});
    }

    return next();
}

module.exports = mustAuthorize;
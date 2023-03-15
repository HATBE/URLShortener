function onlyAdmin(req, res, next) {
    // only admin does not have to check if logged in, cause he must be logged in (mustAuthorize is before).
    if(!req.user.isAdmin()) {
        // if the user is not an admin, hes has not the privileges to access the resource
        return res.status(401).json({status: false, message: "You are not authorized! You need admin privileges."});
    }

    return next();
}

module.exports = onlyAdmin;
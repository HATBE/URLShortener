function onlyAdmin(req, res, next) {
    if(!req.user.isAdmin()) {
        // if the user is not an admin, hes has not the privileges to access the resource
        return res.status(401).json({status: false, message: "You are not authorized! You need admin privileges."});
    }

    return next();
}

module.exports = onlyAdmin;
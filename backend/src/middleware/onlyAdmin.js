function onlyAdmin(req, res, next) {
    if(!req.user.isAdmin()) {
        return res.status(401).json({status: false, message: "You are not authorized! You need admin privileges."});
    }

    next();
}

module.exports = onlyAdmin;
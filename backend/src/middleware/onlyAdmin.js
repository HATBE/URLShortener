function onlyAdmin(req, res, next) {
    if(!req.user.isAdmin()) {
        return res.status(401).json({status: false, message: "You are not authorized!"});
    }

    next();
}

module.exports = onlyAdmin;
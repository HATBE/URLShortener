function errorHandler(err, req, res, next) { 
    if(err) {
        res.status(500).json({message: "Something went wrong"});
        console.warn(err);
        process.exit(1);
    }
};

module.exports = errorHandler;
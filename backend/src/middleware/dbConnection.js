const mongoose = require('mongoose'); // for database

function dbConnection() {
    mongoose.connect(process.env.DB_CONN || 'null', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME || 'test'
    })
    .then((res) => {
        // if db conn was successfull
        console.log('[INIT] successfully connected to database!');
    })
    .catch((error) => {
        // if the server can't connect to db, exit with an error code
        console.warn('[INIT] error while connecting to database:');
        console.warn(error);
        process.exit(1);
    });
}
module.exports = dbConnection;
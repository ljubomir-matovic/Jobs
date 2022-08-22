const mongoose = require('mongoose');

const connectDb = url => mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "jobster"
});

module.exports = connectDb;
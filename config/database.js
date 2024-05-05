const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
function connect() {
    mongoose.connect(process.env.MONGO_DB, {})
        .then(function () {
            console.log('MongoDB Connected');
        })
        .catch(function (err) {
            console.log('MongoDB connection fail');
            console.log(err)
        })
}


module.exports = { connect }
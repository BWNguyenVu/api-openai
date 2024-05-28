const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config();

const MONGO_DB_CLOUD = process.env.MONGO_DB;

function connect() {
    mongoose.connect(MONGO_DB_CLOUD, {})
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((err) => {
            console.log('MongoDB connection failed');
            console.error(err);
        });
}

module.exports = { connect };

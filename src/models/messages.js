const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messages = new Schema({
    messages: {
        type: Array
    }
        // {
        //     role: {
        //         type: String,
        //     },
        //     messages: [
        //     ],
        // }
    
    ,
    
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('messages', messages);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageResponseSchema = new Schema({
    messages: [
        {
            message: {
            },
            response_message_id: {

            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MessageReponse', messageResponseSchema);

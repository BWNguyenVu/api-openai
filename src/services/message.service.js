const MessageModel = require('../models/messages');

class MessageService {
    async GetAllMessage() {
        try {
            const messages = await MessageModel.find();
            return messages;
          } catch (error) {
            throw error;
          }
    }
}

module.exports = new MessageService;

const MessageModel = require('../models/messages');
const MessageResponseModel = require('../models/messagesReponse');

class MessageService {
    async GetAllMessage() {
        try {
            const messages = await MessageModel.find();
            return messages;
          } catch (error) {
            throw error;
          }
    }
    // async GetNewMessage() {
    //   try {
    //     const messages = await MessageModel.find();
    //     if (messages.length === 0) {
    //       throw new Error('No messages found');
    //     }
    
    //     const lastMessage = messages[messages.length - 1];
    //     const lastMessageText = lastMessage.messages[lastMessage.messages.length - 1];
    
    //     return lastMessageText;
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    async GetNewMessage() {
      try {
        // Fetch messages from the database and sort them in descending order by timestamp
        const messages = await MessageResponseModel
        .find()

        return messages;
      } catch (error) {
        throw error;
      }
    }
    
    
}

module.exports = new MessageService;

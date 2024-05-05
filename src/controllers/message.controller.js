const MessageServices = require('../services/message.service')
const {ChatBotLogic} = require('../utils/chatbotLogic');
const colors = require('colors');
const dataTable = require('../Infrastructure/Persistences/Respositories/data_test.json');

class CartController {
    async GetAllMessage(req, res) {
        try {
            const result = await MessageServices.GetAllMessage();
            res.status(200).json({ success: true, message: 'Get all message successfully', message: result });
        } catch (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
    }
    async SendMessage(req, res) {
        const userInput = req.body.userInput;
        try {
          const completionText = await ChatBotLogic(userInput, dataTable);
          res.json({ success: true, completionText });
    
        } catch (error) {
          console.error(colors.red(error));
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
        }
      }
}

module.exports = new CartController();

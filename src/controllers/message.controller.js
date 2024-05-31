const MessageServices = require('../services/message.service')
const {ChatBotLogic} = require('../utils/chatbotLogic');
const {sendToQueue} = require('../event-bus.js/producer')
const colors = require('colors');
const dataTable = require('../Infrastructure/Persistences/Respositories/baseData5mb.json');
const messageModel = require('../models/messages');
const messageResponseModel = require('../models/messagesReponse');

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
    async GetNewMesage(req, res) {
      try {
        const result = await MessageServices.GetNewMessage();
        res.status(200).json({ success: true, message: 'Get new message successfully', message: result });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message});
    }
    }
    async SendMessage(req, res) {
      const userInput = req.body.userInput;
      const chatPreHistory = []
      try {
      // Extract data from the database
      const getData = await messageModel.find({});
      const getDataResponse = await messageResponseModel.find({});
      const extractedMessages = getData ? getData.map(data => data.messages) : [];

      extractedMessages.forEach(messagesArray => {
        messagesArray.forEach(message => {
          chatPreHistory.push({ role: 'user', content: message });
        });
      })

      // Update or save messages in the database
      if (getData.length === 0) {
        const newMessage = new messageModel({
          messages: [userInput],
        });
        await newMessage.save();
      } else {
        const getId = getData.map(data => data._id.toString());
        await messageModel.findOneAndUpdate(
          { _id: getId },
          { $push: { messages: userInput } },
          { new: true }
        );
      }
      const getDataResponseById = getDataResponse.map(data => data._id.toString());
      const getDataById = getData.map(data => data._id.toString());
      const dataLength = getDataResponseById.length === 0
      await sendToQueue({ userInput, chatPreHistory, dataLength, getDataResponseById });
      const url_response_message = "https://api-openai.onrender.com/api/v1/messenger/new-message"
        res.json({ success: true, message: 'Request received and being processed.', url_response_message });
      } catch (error) {
        console.error('Error in SendMessage:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    }
}

module.exports = new CartController();

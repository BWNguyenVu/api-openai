const openai = require('../config/open-ai.js');
const colors = require('colors');
const messageModel = require('../models/messages');
async function chatbotLogic(userInput, dataTable) {
  try {
    const dataTableString = JSON.stringify(dataTable);
    const chatHistory = [];

    const getData = await messageModel.find({});
    const extractedMessages = getData.map(data => data.messages);

    extractedMessages.forEach((messagesArray) => {
      messagesArray.forEach((message) => {
        const datapush = [message[0], message[1]]; 
        chatHistory.push(datapush);
      });
    });

    const messages = chatHistory.map(([role, content]) => ({
      role,
      content,
    }));

    messages.push({ role: 'user', content: dataTableString });
    messages.push({ role: 'user', content: userInput });
    const completion = await openai.createChatCompletion({
      model: process.env.MODEL_OPENAI,
      messages: messages,
    });

    const completionText = completion.data.choices[0].message.content;
    chatHistory.push(['user', userInput]);
    chatHistory.push(['assistant', completionText]);

    const indexedChatHistory = chatHistory.map((message) => [...message]); 

    const lastTwoMessages = indexedChatHistory.slice(-2); 

    const existingMessage = await messageModel.findOne();
    if (existingMessage) {
      existingMessage.messages.push(...lastTwoMessages);
      await existingMessage.save();
    } else {
      const newMessage = new messageModel({
        messages: lastTwoMessages,
      });
      await newMessage.save();
    }
    console.log(chatHistory);

    return completionText;
  } catch (error) {
    console.error(colors.red(error));
    throw new Error('Error processing chatbot logic');
  }
}

module.exports = { chatbotLogic };

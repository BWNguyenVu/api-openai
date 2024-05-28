// const openai = require('../config/open-ai.js');
// const colors = require('colors');
// const messageModel = require('../models/messages');
// const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// async function ChatBotLogic(userInput, dataTable) {
//   try {
//     const key = "91e433c7e46246d397077fe378cc66cd";
//     const endpoint = "https://northvision.openai.azure.com/";
//     const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

//     const dataTableString = JSON.stringify(dataTable);
//     const chatHistory = [];

//     // Check if getData is not undefined
//     const getData = await messageModel.find({});
//     const extractedMessages = getData ? getData.map(data => data.messages) : [];

//     extractedMessages.forEach((messagesArray) => {
//       messagesArray.forEach((message) => {
//         const datapush = [message[0], message[1]]; 
//         chatHistory.push(datapush);
//       });
//     });

//     const messages = chatHistory.map(([role, content]) => ({
//       role,
//       content,
//     }));
    
//     const deploymentName = "northvisiondeployment";
//     messages.push({ role: 'user', content: dataTableString });
//     messages.push({ role: 'user', content: userInput });
//     const completion = await client.streamChatCompletions({
//       deploymentName,
//       messages: messages
//     });

//     const completionText = completion.data.choices[0].delta.content; // Use 'delta.content' instead of 'message.content'
//     chatHistory.push(['user', userInput]);
//     chatHistory.push(['assistant', completionText]);

//     const indexedChatHistory = chatHistory.map((message) => [...message]); 

//     const lastTwoMessages = indexedChatHistory.slice(-2); 

//     const existingMessage = await messageModel.findOne();
//     if (existingMessage) {
//       existingMessage.messages.push(...lastTwoMessages);
//       await existingMessage.save();
//     } else {
//       const newMessage = new messageModel({
//         messages: lastTwoMessages,
//       });
//       await newMessage.save();
//     }
//     // console.log(chatHistory);

//     return completionText;
//   } catch (error) {
//     console.error(colors.red(error));
//     throw new Error('Error processing chatbot logic');
//   }
// }

// module.exports = { ChatBotLogic };

const messageModel = require('../models/messages');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const dataJson = require('../Infrastructure/Persistences/Respositories/baseData5mb.json');

// Function to process chat logic
async function ChatBotLogic(userInput) {
  const endpoint = "https://northvision.openai.azure.com/"
  const key = process.env.KEY_AZURE_OPENAI;
  const deploymentId = process.env.MODEL_AZURE_OPENAI;
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
  const dataTable = require('../Infrastructure/Persistences/Respositories/baseData5mb.json')
  // Build chat history
  const chatHistory = [];
  // Push user input and data table into chat history
  const dataTableString = JSON.stringify(dataTable);
  chatHistory.push({ role: 'user', content: dataTableString });
  chatHistory.push({ role: 'user', content: userInput });
  // Fetch completions from OpenAI
  const completionText = [];
  const events = await client.streamChatCompletions(deploymentId, chatHistory);
  for await (const event of events) {
    for (const choice of event.choices) {
      const delta = choice.delta?.content;
      if (delta !== undefined) {
        completionText.push(delta);
      }
    }
  }
 
  // Join completion text into a single string
  const oneLineText = completionText.join("");
  return oneLineText;
}


module.exports = { ChatBotLogic };

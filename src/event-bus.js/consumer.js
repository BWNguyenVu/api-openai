const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config({ path: '../../.env' });  // Chỉ định đường dẫn đến tệp .env

const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
const { ChatBotLogic } = require('../utils/chatbotLogic');
const messageResponseModel = require('../models/messagesReponse.js');
const { connect } = require('../config/database.js');

const amqp_url_cloud = process.env.RABBITMQ_URL ;

async function consumeQueue() {
    try {
        // 1. Connect to RabbitMQ
        const connection = await amqp.connect(amqp_url_cloud);  
        
        // 2. Create channel
        const channel = await connection.createChannel();
        
        // 3. Create or assert queue
        const queue = 'chat_requests';
        await channel.assertQueue(queue, { durable: true });
        
        // 4. Set prefetch count to 1 to process one message at a time
        channel.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        // 5. Consume messages from queue
            await channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const { userInput, chatPreHistory, dataLength, getDataResponseById, response_message_id } = JSON.parse(msg.content.toString());
                    console.log(" [x] Received '%s'", userInput);
    
                    try {
                        // Process the message
                        const completionText = await ChatBotLogic(userInput, chatPreHistory);
                        console.log(`Processed completion text: ${completionText}`);
                        
                        const newMessage = {
                        response_message_id: response_message_id,
                        user_request: userInput,    
                        assistant_response: completionText,
                        timestamp: new Date() 
                        };
                          
                        if (dataLength) {
                        const newMessageModel = new messageResponseModel({
                            messages: [newMessage],
                        });
                        await newMessageModel.save();
                        } else {
                        await messageResponseModel.findOneAndUpdate(
                            { _id: getDataResponseById },
                            { $push: { messages: newMessage } },
                            { new: true }
                        );
                        }
                              
                        console.log("Successful, saved to database CompletionText");
    
                        // Acknowledge the message
                        channel.ack(msg);
    
                    } catch (error) {
                        console.error('Error processing message:', error);
                        // Optionally, you can reject the message and requeue it
                        channel.nack(msg, false, true);
                    }
                }
            });
    } catch (error) {
        console.error('Error consuming queue:', error);
    }
}
module.exports = { consumeQueue };

connect();

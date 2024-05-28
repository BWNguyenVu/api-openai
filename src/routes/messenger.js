const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message.controller')
const CallBackController = require('../controllers/callback.controller')
router.post('/chat', MessageController.SendMessage);
router.post('/callback', CallBackController.ReceiveResult);
router.get('/', MessageController.GetAllMessage)
router.get('/new-message', MessageController.GetNewMesage)

module.exports = router;
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message.controller')

router.post('/chat', MessageController.SendMessage);
router.get('/', MessageController.GetAllMessage)

module.exports = router;
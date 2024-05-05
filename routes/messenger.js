const express = require('express');
const router = express.Router();
const {chatbotLogic} = require('../utils/chatbotLogic');
const colors = require('colors');
const dataTable = require('../Infrastructure/Persistences/Respositories/data_test.json');

router.post('/chat', async (req, res) => {
    const userInput = req.body.userInput;
    try {
      const completionText = await chatbotLogic(userInput, dataTable);
      res.json({ success: true, completionText });

    } catch (error) {
      console.error(colors.red(error));
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

module.exports = router;
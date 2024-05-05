const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const route = require('./routes');
const db = require('./config/database.js')
const port = process.env.PORT;
const path = require('path')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.connect()
route(app)
const openai = require ('./config/open-ai.js');
const readlineSync = require('readline-sync');
const colors = require('colors');
const dataTable = require('./Infrastructure/Persistences/Respositories/data_test.json');
const messagesModel = require('./models/messages.js')
app.listen(port, function (error) {
  if (error) {
      console.log("Something went wrong");
  }
  console.log("server is running port:  " + port);
})

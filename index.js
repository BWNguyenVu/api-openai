const express = require('express');
const dotenv = require('dotenv');
const app = express();
const route = require('./src/routes');
const db = require('./src/config/database.js')
const port = process.env.PORT;
const path = require('path')

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
db.connect()
route(app)
app.listen(port, function (error) {
  if (error) {
      console.log("Something went wrong");
  }
  console.log("server is running port:  " + port);
})

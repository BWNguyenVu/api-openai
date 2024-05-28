const  { Configuration, OpenAIApi } = require('openai');
const { OpenAIClient, OpenAIKeyCredential } = require("@azure/openai");
const endpoint = process.env.ENDPOINT_AZURE_OPENAI;

const dotenv = require('dotenv');
dotenv.config();

const configuration = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIKeyCredential(endpoint, configuration);

module.exports =  openai;

require('dotenv').config();

const config = {
    openai_api_key: process.env.OPENAI_API_KEY,
};

module.exports = { config };
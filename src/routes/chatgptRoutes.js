const chatgptRoutes = require('express').Router();

const { generateReviews } = require('../controllers/generateReviews');

const limiterMiddleware = require('../middleware/limiterMiddleware');

chatgptRoutes.post('/generate-reviews', limiterMiddleware, generateReviews);

module.exports = chatgptRoutes;
const { Router } = require('express');

const chatgptRoutes = require('./chatgptRoutes');

const router = Router();

router.use('/chatgpt', chatgptRoutes);

module.exports = router;
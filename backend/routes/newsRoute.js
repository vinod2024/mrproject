const express = require('express');
const router = express.Router();

// const { postValidation } = require('../helpers/validation');
const newsController = require('../controllers/newsController');

router.get('/', newsController.newsData);

module.exports = router;
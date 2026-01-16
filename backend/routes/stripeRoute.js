const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// import express from 'express';
// const express = require("express");
// import stripeController from '../controllers/stripeController.js';
// const stripeController = require('../controllers/stripeController');
// const router = express.Router();

// 
// 
// const router = express.Router();

// const auth = require('../middleware/auth');

router.post('/create-payment-intent', stripeController.createPaymentIntent);

// export default router;
module.exports = router;
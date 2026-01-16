const express = require('express');
// import express from 'express';
// import stripe from '../utils/stripe.js';
const stripe = require('../utils/stripe.js');


const createPaymentIntent = async(req, res) => {
  // console.log('req', req.body);
  // return false;
  try{
    const { amount, currency = 'inr', customer_email } = req.body;
    if(!amount || isNaN(amount)){
      return res.status(400).json({
        status: "error",
        message: "Amount is required and amount must be number.",
        statusCode: 400
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "inr",

      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },

      receipt_email: customer_email,
    });


    res.status(200).json({
      status: "success",
      message: "Payment intent successfylly created",
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent.id,
      status: paymentIntent.status,
    });

  }catch(error){
    console.log('create payment intent error', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal server error',
      error: error.message,
      statusCode: 500
    });
  }
}

// export default createPaymentIntent;
module.exports = {
  createPaymentIntent
}
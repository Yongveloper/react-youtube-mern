const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');
const { auth } = require('../middleware/auth');
const path = require('path');

//=================================
//             Subscriber
//=================================

router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
  }).exec((error, subscribe) => {
    if (error) {
      return res.status(400).send(error);
    }
    return res.status(200).json({
      success: true,
      subscribeNumber: subscribe.length,
    });
  });
});

router.post('/subscribed', (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((error, subscribe) => {
    if (error) {
      return res.status(400).send(error);
    }
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({
      success: true,
      subscribed: result,
    });
  });
});

module.exports = router;

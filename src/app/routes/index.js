const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router
  .route('/')
  .get(controller.getHome);

module.exports = router;

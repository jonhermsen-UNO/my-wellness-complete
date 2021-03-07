const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.route('/wellness').get(controller.getWellness);

module.exports = router;

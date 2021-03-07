const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.route('/').get(controller.getHome);
router.route('/environmental').get(controller.getStub);
router.route('/financial').get(controller.getStub);
router.route('/spiritual').get(controller.getStub);
router.route('/vocational').get(controller.getStub);
router.route('/emotional').get(controller.getStub);
router.route('/social').get(controller.getStub);
router.route('/physical').get(controller.getStub);
router.route('/mental').get(controller.getMental);

module.exports = router;

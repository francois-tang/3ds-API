const express = require('express');
const router = express.Router();
const rateLimit = require('../middlewares/rateLimit');
var emailPerfController = require("../controllers/emailPerformance.controller.js");

// Email Performance API Page
router.get('/emailPerformance/json', rateLimit, emailPerfController.getData);

module.exports = router;
const express = require('express');
const router = express.Router();
const rateLimit = require('../middlewares/rateLimit');
var indexController = require("../controllers/index.controller.js");

// Welcome Page
router.get('/', rateLimit, indexController.getWelcome);

// About Page
router.get('/about', rateLimit, indexController.getAbout);

module.exports = router;
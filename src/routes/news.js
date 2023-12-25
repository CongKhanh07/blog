const express = require('express');
const router = express.Router();

// Import NewController
const newController = require('../app/controllers/NewController');
router.get('/', newController.index);

module.exports = router;

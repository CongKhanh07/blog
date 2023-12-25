const express = require('express');
const router = express.Router();

//Import SiteController
const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.home);

module.exports = router;

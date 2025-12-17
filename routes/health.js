const express = require('express');
const router = express.Router();

const heathCheck  = require('../controllers/healthController');

router.get('/health', heathCheck);

module.exports = router;
const express = require('express');
const router  = express.Router();
const { testcontroller } = require('../controller/test-controller');

// Correct route: GET /api/v1/test/testuser
router.get("/testuser", testcontroller);

module.exports = router;

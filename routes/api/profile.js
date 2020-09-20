const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public (doesn't need a token)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;

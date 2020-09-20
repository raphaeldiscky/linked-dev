const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public (doesn't need a token)
router.get('/', (req, res) => res.send('Users route'));

module.exports = router;

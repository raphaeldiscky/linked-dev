const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public (doesn't need a token)
router.get('/', authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

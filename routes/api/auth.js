const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   GET api/auth => http://localhost:5000/api/auth
// @desc    Get user data
// @access  Public
router.get('/', authorize, async (req, res) => {
  try {
    // get user data without password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth => http://localhost:5000/api/auth
// @desc    Login route
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
      .exists()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there's error return status 400 and send error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the req.body
    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400) // Bad request
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Compare password if it's a match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Add user.id in payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Generate token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error'); // Server internal error
    }
  }
);

module.exports = router;

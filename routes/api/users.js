const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route   POST api/users => http://localhost:5000/api/users
// @desc    Register route
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there's error return status 400 and send error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the req.body
    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400) // bad request
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      // Create instance of user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password with hash and salt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save new user to database with encrypted password
      await user.save();

      // Add user.id in payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Generate new token with the id in the payload
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // return jsonwebtoken (if user get token, then user can login right away)
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error'); // Internal server error
    }
  }
);

module.exports = router;

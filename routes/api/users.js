const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

// @route POST api/users/
// @desc Register User
// @access Public
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    // Checks if user with same username already present
    if (user) {
      return res.json({ msg: 'User already exists' });
    }

    // Creates new User
    user = new User({
      username,
      password,
    });

    // Encrypting
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Saves to Database
    await user.save();

    return res.json({ msg: 'User Created', data: { id: user._id } });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// @route GET api/users/login
// @desc Login User
// @access Public
router.post('/login/', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    // Checks if user with username present
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ msg: 'Invalid Credentials' });
    }

    return res.json({ msg: 'User logged in', data: { id: user._id } });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;

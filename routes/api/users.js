const express = require('express');
const router = express.Router();

// @route POST api/users/
// @desc Register User
// @access Public
router.post('/', async (req, res) => {
  res.send('Register User');
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model'); // Import your User model

const Authenticate = express.Router();

router.post('/authenticate', async (req, res) => {
  const { id_use, password } = req.body;

  try {
    const user = await User.findOne({ id_use });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.json({ success: true, message: 'Login successful', user });
    } else {
      return res.json({ success: false, message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = Authenticate;

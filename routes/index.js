var express = require('express');
var router = express.Router();
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcryptjs');
// TODO move jwt to auth middleware
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByUsername(username);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await User.createUser(username, hashedPassword);
    console.log(SECRET_KEY);
    const token = jwt.sign({ id: newUserId }, SECRET_KEY, { expiresIn: '2h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
import User from '../models/User';
const bcrypt = require('bcryptjs');
import { generateToken } from "../middlewares/auth";

router.post('/login', async (req: any, res: any) => {
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

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await User.createUser(username, hashedPassword);
    const token = generateToken(newUserId);

    res.status(200).json({ token });
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

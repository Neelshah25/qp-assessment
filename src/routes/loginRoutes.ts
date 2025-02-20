
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';

const router = express.Router();

// Add new grocery item
router.post('/register', async (req, res) => {
  console.log('Adding new user');
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users (username, password_hash, role)
         VALUES (?, ?, ?)`,
      [username, hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ message: 'Error registering user', error: errorMessage });
  }
});

// Add new grocery item
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {

    const [user] = await db.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    if (!user) {
      res.status(400).json({ message: 'Invalid UserName' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ message: 'Error registering user', error: errorMessage });
  }
});

export default router;




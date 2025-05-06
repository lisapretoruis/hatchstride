import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Request, Response } from 'express';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  console.log('The "register" endpoint was hit!');
  const { email, password, name, avatarUrl } = req.body;
  try {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    email,
    password: hashedPassword,
    name,
    avatarUrl
  });
  await user.save();
  res.status(201).json({ message: 'User registered successfully.' });
} catch (err) {
  res.status(500).json({ error: 'User registration failed.' });
}
});

router.post('/login', async (req: Request, res: Response) => {
  console.log('The "login" endpoint was hit!');
  const { email, password} = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );
  
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  });

router.post('/me', verifyToken, async (req: Request, res: Response) => {
  console.log('The "me" endpoint was hit!');
  const { email, token, bearer } = req.body;
    try {
      console.log('Email:', email);
      console.log('Token:', token);
      console.log('Bearer:', bearer);
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      else
      {
        console.log('User found:', user);
        //return user data without password
        const { password: _, ...userData } = user.toObject();
        res.json(userData);
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'user info not found' });
    }
  });

export default router;

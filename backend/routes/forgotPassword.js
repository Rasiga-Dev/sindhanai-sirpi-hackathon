



import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { transporter } from '../config/email.js';
import School from '../models/School.js';



dotenv.config();
const router = express.Router();

// 🔐 1. Forgot Password - Send OTP
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await School.findOne({ Email_ID: email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      html: `<p>Hello ${user.School_Name},</p><h2>${otp}</h2><p>Valid for 10 minutes.</p>`
    });

    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('forgot-password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 2. Verify OTP - Return Token
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await School.findOne({ Email_ID: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'vosa', {
      expiresIn: '15m',
    });

    // clear otp
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified', token });
  } catch (err) {
    console.error('verify-otp:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 3. Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vosa');
    if (decoded.email !== email) {
      return res.status(401).json({ message: 'Invalid token or email' });
    }

    const user = await School.findOne({ Email_ID: email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('reset-password:', err);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});

export default router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      role: 'VOTER'
    });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};

const seedAdmin = async (req, res, next) => {
  try {
    const email = process.env.ADMIN_DEFAULT_EMAIL;
    const password = process.env.ADMIN_DEFAULT_PASSWORD;

    let admin = await User.findOne({ email });
    if (!admin) {
      const passwordHash = await bcrypt.hash(password, 10);
      admin = await User.create({
        email,
        passwordHash,
        role: 'ADMIN'
      });
    }

    res.json({ message: 'Admin seeded', email });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, seedAdmin };
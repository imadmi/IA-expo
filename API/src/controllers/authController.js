const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const users = new Map(); // Simulated in-memory database

const signup = [
  // Validate input
  check('email').isEmail().withMessage('Must be a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (users.has(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.set(email, { email, password: hashedPassword });

    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ token });
  },
];

const signin = [
  check('email').isEmail().withMessage('Must be a valid email'),
  check('password').exists().withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = users.get(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  },
];

module.exports = {
  signup,
  signin,
};

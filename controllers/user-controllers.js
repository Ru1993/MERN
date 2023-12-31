const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../model/user');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please fill in the required fields' });
    }

    const user = await User.findOne({ email });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }),
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Incorrect login or password entered' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: 'Please fill in the required fields' });
    }

    const registeredUser = await User.findOne({ email });

    if (registeredUser) {
      return res
        .status(400)
        .json({ message: 'A user with the same email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }),
      });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { register, login, current };

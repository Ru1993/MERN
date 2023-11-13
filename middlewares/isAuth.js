const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const userId = await User.findById(decode.id);

    req.user = userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: 'No token access',
    });
  }
};

module.exports = auth;

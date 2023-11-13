const { body } = require('express-validator');

const authValidator = [
  body('email', 'Wrong email format').isString().isEmail(),
  body('password', 'Wrong password format')
    .isString()
    .isLength({ min: 5, max: 20 }),
];

module.exports = {
  authValidator,
};

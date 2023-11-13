const express = require('express');
const { register, login, current } = require('../controllers/user-controllers');
const auth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', auth, current);

module.exports = router;

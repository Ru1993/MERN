const express = require('express');
const auth = require('../middlewares/isAuth');
const {
  all,
  add,
  remove,
  edit,
  employee,
} = require('../controllers/employee-controller');

const router = express.Router();

router.get('/employee', auth, all);
router.get('/employee/:id', auth, employee);
router.post('/employee/add', auth, add);
router.delete('/employee/:id', auth, remove);
router.put('/employee/:id', auth, edit);

module.exports = router;

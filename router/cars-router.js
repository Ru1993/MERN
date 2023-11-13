const express = require('express');
const {
  getCars,
  getCar,
  postAddCar,
  deleteCarId,
  putEditId,
} = require('../controllers/cars-controllers');
const auth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/cars', auth, getCars);

router.get('/cars/:id', auth, getCar);

router.post('/cars/add', auth, postAddCar);

router.delete('/cars/delete/:id', auth, deleteCarId);

router.put('/cars/updated/:id', auth, putEditId);

module.exports = router;

const Cars = require('../model/cars');

const getCars = async (req, res) => {
  try {
    const cars = await Cars.find().sort({ createdAt: -1 });

    if (!cars) {
      res.status(400).json({ message: 'repeat the request again' });
    }
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getCar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'incorrect employee id' });
    }

    const car = await Cars.findById(id);

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "couldn't find car" });
  }
};

const postAddCar = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const car = await Cars.create({
      image,
      price,
      name,
    });

    return res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteCarId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'incorrect car id' });
    }

    const deleteCar = await Cars.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: `${deleteCar.name}, was successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete car' });
  }
};

const putEditId = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'incorrect car id' });
    }

    await Cars.findByIdAndUpdate(id, { name, price, image }, { new: true });

    res.status(200).json({ message: 'the car was successfully updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to updated car' });
  }
};

module.exports = {
  getCars,
  getCar,
  postAddCar,
  deleteCarId,
  putEditId,
};

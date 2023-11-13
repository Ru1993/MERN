const { Employee } = require('../model/user');

const all = async (req, res) => {
  try {
    const employee = await Employee.find();

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get employee' });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.age || !data.address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const employee = await Employee.create({
      ...data,
      userId: req.user.id,
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'incorrect employee id' });
    }

    const deleteEmployee = await Employee.findByIdAndDelete(id);

    res.status(200).json({
      message: `${deleteEmployee.lastName}, was successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee' });
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'incorrect employee id' });
    }

    await Employee.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({ message: 'the data was successfully updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to edit employee' });
  }
};

const employee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "couldn't find employee" });
  }
};

module.exports = { all, add, remove, edit, employee };

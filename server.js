const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const chalk = require('chalk');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouterCars = require('./router/cars-router');
const useRouterAut = require('./router/user-router');
const employeeRouter = require('./router/employee-router');

const app = express();

const errorMsg = chalk.bgKeyword('white').red;
const successMsg = chalk.bgKeyword('green').white;
const infoMsg = chalk.bgKeyword('blue').white;

const corsOptions = {
  original: process.env.MONGO_URL,
  methods: 'GET,POST,DELETE,PUT',
};

mongoose
  .connect(process.env.MONGO_URL || 8000)
  .then(_ => console.log(successMsg('Connect DB')))
  .catch(error => console.log(errorMsg(`Error: ${error}`)));

app.listen(process.env.PORT, 'localhost', error => {
  error
    ? console.log(error)
    : console.log(infoMsg(`Server online ${process.env.PORT}`));
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use(
  morgan(
    infoMsg(':method :url :status :res[content-length] - :response-time ms')
  )
);

app.use(apiRouterCars);
app.use(useRouterAut);
app.use(employeeRouter);

app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

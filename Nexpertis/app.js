const express = require('express');
const morgan = require('morgan');
const tasksRoute = require('./tasks');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();


//DB
mongoose.connect(
  'mongodb+srv://dbWsbUser:qBw7hWXHt7nrX!S@wsbapi.j7j7j.mongodb.net/Nexpertis?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

//logger
app.use(morgan('combined'))
//parse body
app.use(bodyParser.json());

app.use('/todolist', tasksRoute);

app.use((req, res, next) => {
  res.status(404).json({
    wiadomość: 'Nie znaleziono. Not Found',
  });
});

module.exports = app;

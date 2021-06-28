const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  User: String,
  AssignedUser: String,
  Title: String,
  Describe: String,
  StartDate: Date,
  EndDate: Date,
})

module.exports = mongoose.model("Task", taskSchema);

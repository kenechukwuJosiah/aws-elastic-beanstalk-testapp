const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  j_reg: String,
surname: String,
name: String,
othernames: String,
lga: String,
state: String,
department: String,
total: String,
faculty: String,
subject1: String,
subject1score: String,
subject2:String,
subject2score: String,
subject3: String,
recommendation: String,
subject3score: String,
english: String,
qualified: String,
type: String,
linkStatus: {Type: Number, default: 0}
});

const Model = mongoose.model('ProjectManager', Schema)

module.exports = Model;
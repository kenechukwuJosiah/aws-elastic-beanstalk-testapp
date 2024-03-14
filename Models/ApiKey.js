const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
  apiKey: String,
  appSecret: String,
  projectName: String,
  projectManager: String,
  status: {type: Number, default: 1}
});

const ApiKeyModel = mongoose.model('ApiKey', ApiKeySchema);

module.exports = ApiKeyModel;
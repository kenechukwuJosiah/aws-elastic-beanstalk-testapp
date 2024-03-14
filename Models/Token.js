const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: String,
  generatedAt: Number,
  expiresAt: Number,
  status: {type: Number, default: 1}
});

const TokenModel = mongoose.model('Token', TokenSchema);

module.exports = TokenModel;
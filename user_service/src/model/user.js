var mongoose = require('mongoose');
var UserSchema;

UserSchema = mongoose.Schema({
  created: {type: Date, default: Date.now},
  name: {type: String, required: true, trim: true},
  birthday: {type: Date, required: true}

}, {versionKey: false});

module.exports = mongoose.model('User', UserSchema);

var mongoose = require('mongoose');
var QuestSchema;

QuestSchema = mongoose.Schema({
  created: {type: Date, default: Date.now},
  title: {type: String, required: true, trim: true},
  toMatch: {type: Number, required: true}

}, {versionKey: false});

module.exports = mongoose.model('Quest', QuestSchema);

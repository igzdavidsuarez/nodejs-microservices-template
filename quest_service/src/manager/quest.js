var log = require('../log');
var Quest = require('../model/quest');

module.exports = {
  getQuests: getQuests,
  createQuest: createQuest
};

function getQuests(callback) {
  log.info('Looking for quests...');
  Quest.find({}).exec(callback);
}

function createQuest(questInput, callback) {
  log.info('Creating quest...');
  var quest = new Quest(questInput);
  quest.save(callback);
}

var services = require('services');

module.exports = function(server){
	server.get('/quests', getQuests);
	server.post('/quest', createQuest);
};

function getQuests(req, res, next){
	req.log.info('Looking for quests...');

	services.quest.getQuests(function(err, data) {
		if (err) {
			return res.send({error: err});
		}
		res.send(data);
	});

	return next();
}

function createQuest(req, res, next){
	req.log.info('Creating quest...');

	services.quest.createQuest(req.body, function(err, data) {
		if (err) {
			return res.send({error: err});
		}
		res.send(data);
	});

	return next();
}

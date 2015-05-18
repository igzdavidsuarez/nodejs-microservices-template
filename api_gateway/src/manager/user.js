services = require('services');
restify = require('restify');

module.exports = {
	getUserQuests: getUserQuests
};

function getUserQuests(id, callback){

	var userQuests = [];

	services.user.getUser(id, function(err, user){
		if(err){
			return callback(err);
		}

		if(!user){
			return callback(new restify.errors.BadRequestError('User does not exists'));
		}

		services.quest.getQuests(function(err, quests){
			if(err){
				return callback(err);
			}

			if(quests){
				quests.forEach(function(quest){
					if(quest.toMatch){
						userQuests.push(quest);
					}
				})
			}

			callback(null, userQuests);
		})
	});
}
module.exports.create = function(modelName) {
	var Repository = require('./' + modelName.toLowerCase() + 'Repository');
	return new Repository();
};
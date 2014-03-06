module.exports.create = function(modelName) {
	var repositoryName = modelName.toLowerCase() + 'Repository';
	console.log('Will create new ' + repositoryName + '...');
	var Repository = require('./' + repositoryName);
	return new Repository();
};
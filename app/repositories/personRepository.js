var BaseRepository = require('./baseRepository');

var PersonRepository = (function(parent) {
	PersonRepository.prototype = new BaseRepository('Person');
	PersonRepository.prototype.constructor = PersonRepository;

	function PersonRepository() {
		parent.call(this, 'Person');
	}

	return PersonRepository;
})(BaseRepository);

module.exports = PersonRepository;
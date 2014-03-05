var BaseRepository = require('./baseRepository');

var TodoRepository = (function(parent) {
	TodoRepository.prototype = new BaseRepository('Todo');
	TodoRepository.prototype.constructor = TodoRepository;

	function TodoRepository() {
		parent.call(this, 'Todo');

		var self = this;

		self.FindAllTodos = function(cb) {
			self.FindAll(null, cb, false);
		}
	}

	return TodoRepository;
})(BaseRepository);

module.exports = TodoRepository;
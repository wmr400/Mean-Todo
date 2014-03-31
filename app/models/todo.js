var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	description: String,
	done: Boolean,
	priority: String,
	createDate: Date,
	dueDate: Date
});

todoSchema.index({
	text: 1
});

module.exports = mongoose.model('Todo', todoSchema);
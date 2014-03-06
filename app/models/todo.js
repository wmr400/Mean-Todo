var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	text: String,
	done: Boolean,
	person_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person'
	}
});

todoSchema.index({
	person_id: 1,
	text: 1
});

module.exports = mongoose.model('Todo', todoSchema);
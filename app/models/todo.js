var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	text: String,
	done: Boolean,
	person_id: {
		type: Schema.Types.ObjectId,
		ref: 'Person'
	}
});

module.exports = mongoose.model('Todo', todoSchema);
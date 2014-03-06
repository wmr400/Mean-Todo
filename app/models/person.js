var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
	name: { 
		type: String, 
		unique: true 
	}
});

module.exports = mongoose.model('Person', personSchema);
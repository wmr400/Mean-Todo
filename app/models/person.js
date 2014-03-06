var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Person', personSchema);
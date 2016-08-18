// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
	recipeDetails: String,
 	createdDate: Date,
 	createdBy: String,
 	public: Boolean
}));
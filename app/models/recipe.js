// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	category: {type: String},
	recipeName: {type: String},
	recipeDetails: {type: String},
	timePrep: {type: String},
	timeCook: {type: String},
	servings: {type: String}, 
	calories: {type: String},
	fat: {type: String},
	protein: {type: String},
	carbs: {type: String},
	fiber: {type: String},
 	createdDate: {type: Date},
 	createdBy: {type: String},
 	public: {type: Boolean, default:true}
});




var User = mongoose.model('Recipe', UserSchema)
module.exports = User;
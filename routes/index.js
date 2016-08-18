var express = require('express');
var router = express.Router();

//var User = require('../models/register');
var Recipe = require('../app/models/recipe'); //
var mongoose    = require('mongoose');

// var recipeRoutes = function(){

// };



// GET recipe
router.get('/recipes', function(req, res){
  var query = req.query;
  if(req.query.category)
  {
    query.category = req.query.category;
  }
  Recipe.find(query, function(err,recipes){
    if(err)
      res.status(500).send(err);
    else
      res.json(recipes);
  });
});

// GET recipe by ID
router.get('/recipes/:recipeId', function(req, res){

  Recipe.findById(req.params.bookId, function(err,recipe){
    if(err)
      res.status(500).send(err);
    else
      res.json(recipe);
  });
});


// POST recipe
router.post('/recipes', function(req, res){
  var recipe = new Recipe(req.body);
  
  recipe.save();
  res.status(201).send(recipe);
});

// Edit recipe







// GET /register
// router.get('/register', function(req, res,next) {
// 	return res.send('Register today!');
// });



// Add register user
// router.post('/register', function(req, res, next) {
    // if (req.body.firstName &&
    //     req.body.lastName &&
    //     req.body.email &&
    //     req.body.password &&
    //     req.body.confirmPassword) {

    //     // Confirm that user typed same password twice
    //     if (req.body.password != req.body.confirmPassword) {
    //     	var err = new Error('Passwords do not match.');
    //         err.status = 400;
    //         return next(err);
    //     }

        // create object with form input
        // var userData = {
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     password: req.body.password
        // };
        // // use schema's create method to insert document into mongo
        // User.create(userData, function(error, user) {
        //     if (error) {
        //         return next(error);
        //     } else {
        //         return res.redirect('/public');
        //     }

        // });

    // } else {
    //     var err = new Error('All fields required.');
    //     err.status = 400;
    //     return next(err);
    // }
// })

module.exports = router;
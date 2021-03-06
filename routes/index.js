var express = require('express');
var router = express.Router();

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var Recipe = require('../app/models/recipe'); //
var User = require('../app/models/user'); // get our mongoose model
var mongoose = require('mongoose');




// ***************************
// Register router
// ***************************
router.post('/register', function(req, res, next) {

    if (req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.password &&
        req.body.confirmPassword) {

        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // create object with form input
        var userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function(error, user) {

            if (error) {
                return next(error);
            } else {
                return res.json({
                    success: true,
                    message: 'User Successfully Created!'
                });
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});



// ***************************
// Recipe routers
// ***************************

// GET recipe
router.get('/recipes', function(req, res) {

    Recipe.find(function(err, recipes) {
        if (err)
            res.status(500).send(err);
        else
            res.json(recipes);
    });
});

// SEARCH recipe
router.get('/recipes/search', function(req, res) {
    var query = {};

    if (req.query.category) {
        query.category = req.query.category;
    }

    if (req.query.createdBy) {
        query.createdBy = req.query.createdBy;
    }



    Recipe.find(query, function(err, recipes) {
        if (err)
            res.status(500).send(err);
        else
            res.json(recipes);
    });
});

// POST recipe
router.post('/recipes', function(req, res) {

    var recipe = new Recipe(req.body);

    Recipe.create(recipe, function(err, recipe){
      if (err) {
        return res.status(500).json({ err: err.message});
      }  

    recipe.save();
    res.status(201).send(recipe);
  });
});

// Middleware for recipe
router.use('/recipes/:recipeId', function(req, res, next) {
    Recipe.findById(req.params.recipeId, function(err, recipe) {
        if (err)
            res.status(500).send(err);
        else if (recipe) {
            req.recipe = recipe;
            next();
        } else {
            res.status(404).send('No recipe found');
        }
    });
});

// Delete recipe
router.delete('/recipes/:recipeId', function(req, res){
  req.recipe.remove(function(err){
    if(err)
      res.status(500).send(err);
    else{
      res.status(204).send('Removed');
    }
  });
});


module.exports = router;
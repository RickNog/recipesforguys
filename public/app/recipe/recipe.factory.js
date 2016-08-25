(function() {
    'use strict';
    angular
        .module('app')
        .factory('RecipeFactory', RecipeFactory);
    RecipeFactory.$inject = ['$http', '$q', 'localStorageService', 'apiUrl'];
    
    /* @ngInject */
    function RecipeFactory($http, $q, localStorageService, apiUrl) {
        

        var service = {
            getRecipe: getRecipe,
            addRecipe: addRecipe,
            deleteRecipe: deleteRecipe,
            editRecipe: editRecipe,
            // searchRecipe: searchRecipe
        };
        return service;
        ////////////////
       

    //Uses GET HTTP call to retrieve all recipe objects from database
        function getRecipe() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: apiUrl + 'recipes',
                //data: category
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;


        }

        //Uses POST HTTP call to add a new recipe into the database
        function addRecipe(category, recipeName, recipeDetails, timePrep, timeCook, servings, calories, fat, protein, carbs, fiber, createdDate, createdBy) {

            var defer = $q.defer();

            var newRecipe = { category: category, recipeName: recipeName, recipeDetails: recipeDetails, timePrep: timePrep, timeCook: timeCook, servings: servings, calories: calories, fat: fat, protein: protein, carbs: carbs, fiber: fiber, createdDate: createdDate, createdBy: createdBy };

            $http({
                method: 'POST',
                url: apiUrl + 'recipes',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: newRecipe
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;

        }

        //Uses DELETE HTTP call to delete recipes from database
        function deleteRecipe(recipeId) {

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: apiUrl + recipeId,
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;

        }

        //Uses PUT HTTP call to update a recipe in the database
        function editRecipe(data) {

            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: apiUrl + data.recipeId,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: data
            }).then(function(response) {
                    if (response.status = 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;

        }

        //Uses GET HTTP call to send searchQuery object to database and returns results 
        //of advanced search
        function searchRecipe(searchQuery) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: apiUrl + 'recipes/search?category=' + searchQuery.category,
                // data: category,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
                
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }
    }
})();
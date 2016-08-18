(function() {
    'use strict';
    angular
        .module('app')
        .factory('RecipeFactory', RecipeFactory);
    RecipeFactory.$inject = ['$http', '$q', 'localStorageService', 'apiUrl'];
    
    /* @ngInject */
    function RecipeFactory($http, $q, localStorageService, apiUrl) {
        var url = apiUrl + 'recipes/'

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
                url: url + 'recipes'
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
        function addRecipe(calories, fat, protein, carbs, fiber, sugar, servings, timePrep, timeCook) {

            var defer = $q.defer();

            var newProperty = { calories: calories, fat: fat, protein: protein, carbs: carbs, fiber: fiber, sugar: sugar, servings: servings, timePrep: timePrep, timeCook: timeCook };

            $http({
                method: 'POST',
                url: url + 'recipes',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: newProperty
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
                url: url + recipeId,
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
                url: url + data.recipeId,
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

        //Uses POST HTTP call to send searchQuery object to database and returns results 
        //of advanced search
        // function searchRecipe(searchQuery) {
        //     var defer = $q.defer();

        //     $http({
        //         method: 'POST',
        //         url: url + 'search',
        //         headers: {
        //             'Content-Type': 'application/json; charset=utf-8'
        //         },
        //         data: searchQuery
        //     }).then(function(response) {
        //             if (typeof response.data === 'object') {
        //                 defer.resolve(response);
        //             } else {
        //                 defer.reject("No data found!");
        //             }
        //         },
        //         function(error) {
        //             defer.reject(error);
        //         });

        //     return defer.promise;
        // }
    }
})();
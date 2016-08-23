(function() {
    'use strict';
    angular
        .module('app')
        .controller('RecipeController', RecipeController);
    RecipeController.$inject = ['RecipeFactory', '$stateParams', 'localStorageService'];
    
    /* @ngInject */
    function RecipeController(RecipeFactory, $stateParams, localStorageService) {
        var vm = this;
        vm.title = 'RecipeController';
        vm.getRecipe = getRecipe;
        vm.addRecipe = addRecipe;
        vm.deleteRecipe = deleteRecipe;
        vm.editRecipe = editRecipe;
        vm.searchRecipe = searchRecipe;
        vm.username = localStorageService.get("username");


        activate();
        ////////////////
        function activate() {

            //getRecipe();
            //Searches recipes by users if user is logged in
        //     if (vm.username) {
        //         searchRecipeByUser(vm.username);
        // }
        //Performs advanced search with search terms passed into search parameters

            // searchRecipe();
    }

    //Creating function to call RecipesFactory's getRecipes method to get and store all recipies
        function getRecipe() {

            RecipeFactory.getRecipe()
                .then(function(response) {

                        vm.recipes = response.data;
                        toastr.success('Recipe Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call RecipesFactory's addRecipes method to add property
        function addRecipe(category, recipeName, recipeDetails, timePrep, timeCook, servings, calories, fat, protein, carbs, fiber, createdDate, createdBy) {

            RecipeFactory.addRecipe(category, recipeName, recipeDetails, timePrep, timeCook, servings, calories, fat, protein, carbs, fiber, createdDate, createdBy)
                .then(function(response) {

                        vm.recipes.push(response.data);
                        toastr.success('Recipe Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call RecipesFactory's delete property method to delete recipies
        function deleteRecipe(data) {
            var index = vm.recipes.indexOf(data);
            RecipeFactory.deleteRecipe(data.RecipeId).then(function(response) {

                    vm.recipeDel = response.data;
                    toastr.success('Recipe Successfully Deleted!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });

            return vm.recipes.splice(index, 1);

        }

        //Creating function to call RecipesFactory's edit property method to update recipies
        function editRecipe(data) {

            RecipeFactory.editRecipe(data)
                .then(function(response) {

                        toastr.success('Recipe Updated!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call R's searchrecipies method to advanced search
        function searchRecipe(chicken, beef) {

            var searchQuery = { category: category };

            RecipeFactory.searchRecipe(searchQuery)
                .then(function(response) {

                        vm.searchResults = (response.data);
                        toastr.success('Recipe Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }
    }
})();
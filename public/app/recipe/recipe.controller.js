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
        vm.searchRecipeByEmail = searchRecipeByEmail;
        vm.loginEmail = localStorageService.get("email");

        vm.searchCategory = $stateParams.category


        activate();
        ////////////////
        function activate() {

            //Searches recipes by users if user is logged in
            if (vm.loginEmail) {
                searchRecipeByEmail();
            }

            searchRecipe(vm.searchCategory);

        }

    //Creating function to call RecipesFactory's getRecipes method to get and store all recipies
        function getRecipe() {

            RecipeFactory.getRecipe()
                .then(function(response) {

                        vm.recipe = response.data;
                        toastr.success("Success");

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        //Creating function to call RecipesFactory's addRecipes method to add recipes
        function addRecipe(category, recipeName, recipeDetails, timePrep, timeCook, servings, calories, fat, protein, carbs, fiber, createdDate, createdBy) {
                if (category && category !== "") {

                    RecipeFactory.addRecipe(category, recipeName, recipeDetails, timePrep, timeCook, servings, calories, fat, protein, carbs, fiber, createdDate, createdBy)
                .then(function(response) {

                        response;
                        toastr.success('Recipe Successfully Added!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
                }
                else {
                    toastr.error('Please select a category.')
                }
            
        }

        //Creating function to call RecipesFactory's delete property method to delete recipies
        function deleteRecipe(data) {
            var index = vm.myRecipes.indexOf(data);
            RecipeFactory.deleteRecipe(data._id).then(function(response) {

                    vm.recipeDel = (response.data);
                    toastr.success('Recipe Successfully Deleted!');

                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });

            return vm.myRecipes.splice(index, 1);

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

        // Function to call searchrecipe for method to search category
        function searchRecipe(category) {

            var searchQuery = { category: category };

            RecipeFactory.searchRecipe(searchQuery)
                .then(function(response) {

                        vm.searchResults = (response);
                        toastr.success('Search Completed Successfully!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        // Function to call searchrecipe for method to search createdBy
        function searchRecipeByEmail() {

            var searchQuery = { createdBy: vm.loginEmail };

            RecipeFactory.searchRecipeByEmail(searchQuery)
                .then(function(response) {

                        vm.myRecipes = (response);
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
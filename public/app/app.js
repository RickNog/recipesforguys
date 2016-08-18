(function() {
    'use strict';

    // define the top-level app container
    var app = angular.module('app', ['ui.router', 'LocalStorageModule']);

    app.config(function(localStorageServiceProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        // $httpProvider.interceptors.push('AuthInterceptor');

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/home',
            templateUrl: '../partials/partial-home.html',
            controller: 'RecipeController',
            controllerAs: 'vm'
        })
            // CALLS REGISTRATION PAGE
            .state('register', {
            url: '/register',
            templateUrl: '../partials/partial-register.html',
            controller: "AuthController",
            controllerAs: "vm"
        })

            // CALLS ABOUT PAGE
            .state('about', {
            url: '/about',
            templateUrl: '../partials/partial-about.html',
            controller: "RecipeController",
            controllerAs: "vm"
        })

            // CALLS THE TOOLS PAGE
            .state('tools', {
            url: '/tools',
            templateUrl: '../partials/partial-tools.html',
            controller: "RecipeController",
            controllerAs: "vm"
        })

            // CALLS ESSENTIALS PAGE
            .state('essentials', {
            url: '/essentials',
            templateUrl: '../partials/partial-essentials.html',
            controller: "RecipeController",
            controllerAs: "vm"
        })

            // CALLS MY RECIPES PAGE
            .state('myrecipes', {
            url: '/myrecipes',
            templateUrl: '../partials/partial-myrecipes.html',
            controller: "RecipeController",
            controllerAs: "vm"
        })
    });

//Global variable 
app.value("apiUrl", "http://localhost:8000/api/");

})();

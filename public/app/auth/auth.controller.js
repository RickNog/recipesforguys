//Creating Auth Controller to pass user inputs to Auth factory

(function() {
    'use strict';
    angular
        .module('app')
        .controller('AuthController', AuthController);
    AuthController.$inject = ['AuthFactory', '$state', 'localStorageService'];
    
    /* @ngInject */
    function AuthController(AuthFactory, $state, localStorageService) {
        var vm = this;
        vm.title = 'AuthController';
        vm.registerUser = registerUser;
        vm.loginUser = loginUser;
        vm.logoutUser = logoutUser;
         vm.username = localStorageService.get("username");

        //Checks to see if there is a stored username, if yes sets login status to true
        if (vm.username) {
            vm.userLoggedIn = true;
        }

        activate();
        ////////////////
        function activate() {
        }

        function registerUser(email, password, confirmPassword, firstName, lastName){
        	AuthFactory.registerUser(email, password, confirmPassword, firstName, lastName)
        	.then(function(response){

                toastr.success('User successfully registered!');

        		vm.newFirstName = '';
                vm.newLastName = '';
        		vm.newEmail = '';
        		vm.newPassword = '';
                vm.newConfirmPassword = '';

                $state.go("myrecipes");
            },
            function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.error(error);
                    }
                });
        }

        //Creating function to call login user from AuthFactory and store login status
        function loginUser(loginEmail, loginPassword) {
            logoutUser();
            AuthFactory.loginUser(vm.loginEmail, vm.loginPassword)
            .then(function(response) {
                    vm.userLoggedIn = true;
                    vm.loginData = response.data;

                    toastr.success('User successfully logged in!');

                    vm.loginEmail = '';
                    vm.loginPassword = '';

                    $state.go("myrecipes");
                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.error(error);
                    }
                });
        }

        // Defining logoutUser to call logoutUser method in AuthFactory and 
        // redirect user to home pageupon clearing access_token from local storage
        function logoutUser() {
            vm.userLoggedIn = false;
            AuthFactory.logoutUser();
            $state.go('home');
        }
    }
})();
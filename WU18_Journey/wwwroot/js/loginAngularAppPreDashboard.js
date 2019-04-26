var loginAngularPreDashboard = angular.module("loginAngularAppPreDashboard", ['ngRoute', 'ngCookies']);

loginAngularPreDashboard.config(function ($routeProvider) {

    $routeProvider.when("/register/", {
        templateUrl: '/templates/register.html',
        controller: 'journeyLoginController'
    })


});


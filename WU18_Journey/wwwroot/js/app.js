var app = angular.module("journeyApp", ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {

    $routeProvider.when("/CompleteRoadTrip/", {
        templateUrl: '/templates/completeRoadTrip.html',
        controller: 'journeyController'
    })

        .when("/register/", {
            templateUrl: '/templates/register.html',
            controller: 'journeyLoginController'
        })

        .when("/addVehicles/", {
            templateUrl: '/templates/addVehicle.html',
            controller: 'addVehiclesController'
        })

        .when("/manageVehicles/", {
            templateUrl: '/templates/manageVehicles.html',
            controller: 'manageVehiclesController'
        })

        .when("/createNewRoadtrip/", {
            templateUrl: '/templates/createNewRoadtrip.html',
            controller: 'getRoadtripController'
        })

        .when("/completeRoadtrip/", {
            templateUrl: '/templates/completeRoadtrip.html',
            controller: 'journeyController'
        })

        .when("/ongoingRoadtrips/", {
            templateUrl: '/templates/ongoingRoadtrips.html',
            controller: 'journeyController'
        })
        .when("/support/", {
            templateUrl: '/templates/support.html',
            controller: 'supportController'
        })

    //.when("/movie/:omdbId", {
    // templateUrl: '/moviePageOnSelect.html',
    //   controller: 'omdbController'
    // })

    //.otherwise({
    //    templateUrl: '/templates/movieDetails.html',
    //    controller: 'moviesController'
    //});

}); 



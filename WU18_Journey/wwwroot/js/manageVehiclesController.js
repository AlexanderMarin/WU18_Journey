app.controller("manageVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {






    console.log("$rootScope.loggedInUser ", $rootScope.loggedInUser);

    var getVehiclesUrl = "/api/Vehicles/";

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        console.log("get vehicles response: ", response);

        $scope.getAvailableVehicles = response.data.availableVehicles;




        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {

        console.log("get vehicles ERROR response: ", response);

    });

































});
app.controller("journeyController", function ($scope, $http, $rootScope, $window, $cookies) {



    $rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));



    console.log("$rootScope.loggedInUser ", $rootScope.loggedInUser);

    //var getVehiclesUrl = "/api/Vehicles/";

    //$http.get(getVehiclesUrl,{ headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken }}).then(function successCallback(response) {

    //        console.log("get vehicles response: ", response);

    //    $scope.getAvailableVehicles = response.data.availableVehicles;




    //        // If error --------------------------------------------------------------------------------------------------
    //    }, function errorCallback(response) {

    //        console.log("get vehicles ERROR response: ", response);

    //    });


  

     

   

   

    
});

app.controller("getRoadtripController", function ($scope, $http, $rootScope, $window, $cookies) {

    $scope.RoadtripMilesStart = 0;
    $scope.RoadtripMilesStop = 0;
    console.log("Hej");

    $scope.createRoadtripJsAction = function () {

        console.log("Function Activated");

        // Input Fields through ng-model
        var RoadtripDate = $scope.dateStartPicker;

        var RoadtripMilesStart = $scope.RoadtripMilesStart;
        var RoadtripMilesStop = $scope.RoadtripMilesStop;

        var TravelDistance = $scope.TravelDistance;

        var StartDestination = $scope.StartDestination;
        var StopDestination = $scope.StopDestination;

        var Matter = $scope.Matter;
        var Note = $scope.Note;

        var UserId = $scope.userId;


        var postRoadtripObject = {
            Date: RoadtripDate,
            RoadtripMilesStart: RoadtripMilesStart,
            RoadtripMilesStop: RoadtripMilesStop,
            TravelDistance: TravelDistance,
            StartDestination: StartDestination,
            StopDestination: StopDestination,
            Matter: Matter,
            Note: Note,
            UserId: UserId
        };

        console.log("postRoadtripObject: ", postRoadtripObject);

        var postRoadtripUrl = "/api/Roadtrips";

        $http.post(postRoadtripUrl, postRoadtripObject).then(function successCallback(response) {

            console.log("SuccessfullCallback response: ", response);

            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response for create roadtrip:" + response);

        });



    }
});

app.controller("addVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {





    // On login load roadtrips

    var getVehiclesUrl = "/api/Vehicles/";

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        console.log("get vehicles response: ", response);

        $scope.getAvailableVehicles = response.data.availableVehicles;




        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {

        console.log("get vehicles ERROR response: ", response);

        });



    // Post Vehicle ------------------------------ --------------------------------- -------------------------- ---------------------- -------------------
    $scope.addNewVehicleJsAction = function () {


        // POSTING NEW CAR ON DATABASE ----------------------------------------




        //console.log("loginPostObject: ", vehiclePostObject);




        //$http.post(postNewVehicleUrl, vehiclePostObject).then(function successCallback(response) {

        //    console.log("SuccessfullCallback response for add vehicle: ", response);

        //    postedVehicleId = response.data.vehicleId;



        //    // If error --------------------------------------------------------------------------------------------------
        //}, function errorCallback(response) {

        //    console.log("errorCallback response: " + response);

        //});

        //// POSTING NEW CAR ON USER ICOLLECTION ----------------------------------------

        //var UserId = globarUserId;

        //var VehicleId = postedVehicleId;


        //console.log("UserId: " + UserId);
        //console.log("VehicleId: " + VehicleId);


        // var PostVehicleInUserICollectionUrl = "/Api/Users/vehicleToCollection/" + UserId + "/" + VehicleId;

        var VehicleMake = $scope.VehicleMake;
        var VehiclePlateNumber = $scope.VehiclePlateNumber;

        console.log("VehicleMake: " + VehicleMake);
        console.log("VehiclePlateNumber: " + VehiclePlateNumber);

        var vehiclePostObject = {
            Make: VehicleMake,
            PlateNumber: VehiclePlateNumber
        };

        var postNewVehicleUrl = "/api/Vehicles/";

        $http.post(postNewVehicleUrl, vehiclePostObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback response for for ICOLLECTION: ", response);






            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response for ICOLLECTION: " + response);

        });
    }
});

app.controller("manageVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {





    // On login load roadtrips

    var getVehiclesUrl = "/api/Vehicles/";

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        console.log("get vehicles response: ", response);

        $scope.getAvailableVehicles = response.data.availableVehicles;




        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {

        console.log("get vehicles ERROR response: ", response);

        });


    $scope.deleteVehicle = function (Vehicle) {
        console.log("Deleting : ", Vehicle);
    }


    $scope.setVehicleInActive = function (Vehicle) {
        console.log("Setting vehicle Inactive: ", Vehicle);
    }


    $scope.setVehicleActive = function (Vehicle) {
        console.log("Setting vehicle Active: ", Vehicle);
    }
});

app.controller("supportController", function ($scope, $http, $rootScope, $window, $cookies) {




});







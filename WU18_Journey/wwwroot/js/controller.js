app.controller("journeyController", function ($scope, $http, $rootScope, $window, $cookies) {



    $rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));



    console.log("$rootScope.loggedInUser ", $rootScope.loggedInUser);

    var getRoadtripsUrl = "/api/Roadtrip/";

    $http.get(getRoadtripsUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        console.log("successfullCallback response GET ROADTPPA: ", response);

        $scope.unfinishedRoadtrips = response.data;
        




        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {

        console.log("get roadtrips ERROR response: ", response);

        });

    $scope.completeRoadtripJsFunction = function (roadtrip) {
        console.log("Completeing Roadtrip: ", roadtrip);

        console.log("Car to edit: ", roadtrip)
    }

  

    
});

app.controller("getRoadtripController", function ($scope, $http, $rootScope, $window, $cookies) {


    // GOOGLE GEOLOCATION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function
            (position) {

            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            $scope.$apply();


            console.log(position);

        }, function () {
            $scope.longitude = 13.738671;
            $scope.latitude = 57.356136;
        });
    } else {
        $scope.longitude = 13.738671;
        $scope.latitude = 57.356136;
    }

    $scope.findAdress = function () {

        var geocoder = new google.maps.Geocoder;

        var latlng = {
            lat: parseFloat($scope.latitude),
            lng: parseFloat($scope.longitude)
        }

        geocoder.geocode({ 'location': latlng }, function (result, status) {

            console.log(status);
            console.log(result);

            if (result[0]) {
                $scope.myAdress = result[0].formatted_address;
                $scope.$apply();
            }

        });

    };



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


        if (StartDestination == undefined) {
            StartDestination = $scope.myAdress;
        }

        if (StartDestination == "") {
            StartDestination = $scope.myAdress;
        }

        if (StartDestination == undefined) {
            StartDestination = $scope.StartDestination;
        }
        console.log("START: ", StartDestination);

        var postRoadtripObject = {
            Date: RoadtripDate,
            RoadtripMilesStart: RoadtripMilesStart,
            RoadtripMilesStop: RoadtripMilesStop,
            StartDestination: StartDestination,
            StopDestination: StopDestination,
            Matter: Matter,
            Note: Note,
        };

        console.log("postRoadtripObject: ", postRoadtripObject);

        var postRoadtripUrl = "/api/Roadtrip";

        $http.post(postRoadtripUrl, postRoadtripObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback response: ", response);

            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response for create roadtrip:" + response);

        });



    }





    
});

app.controller("manageVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {





  

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

app.controller("addVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {
    

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
app.controller("completeRoadtripController", function ($scope, $http, $rootScope, $window, $cookies) {




});
app.controller("supportController", function ($scope, $http, $rootScope, $window, $cookies) {




});







app.controller("journeyController", function ($scope, $http, $rootScope, $window, $cookies) {



    $rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));



    console.log("$rootScope.loggedInUser ", $rootScope.loggedInUser);

    // GETTING_ ROADTRIPS ON LOAD
    // FIX FILTER ONGOING ROADTRIPS
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
        var RoadtripId = roadtrip.roadtripId;
        console.log("RoadtripID: ", RoadtripId);
        
        var getRoadtripToCompleteByIdUrl = "api/Roadtrip/" + RoadtripId;

        $http.get(getRoadtripToCompleteByIdUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback getRoadtripToCompleteByIdUrl ", response);


            $rootScope.roadtripDate = response.data.date;
            console.log($scope.roadtripDate);
            $rootScope.roadtripCarMake = response.data.vehicleMake;
            console.log($scope.roadtripCarMake);

           $rootScope.roadtripCarNumberPlate = response.data.vehiclePlateNumber;
            console.log($scope.roadtripCarNumberPlate);



            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response getRoadtripToCompleteByIdUrl: " + response);

        });


    };

        
    

  

    
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


    //DROPDOWN CAR SELECTION

   

    $scope.selectCarForRoadtrip = function (Vehicle) {

        $scope.dropdownText = Vehicle.make + " " + Vehicle.plateNumber;
        $rootScope.selectedVehicleMake = Vehicle.make;
        $rootScope.selectedVehiclePlateNumber = Vehicle.plateNumber;
        
        
    }
    

    $scope.RoadtripMilesStart = 0;
    $scope.RoadtripMilesStop = 0;

    $scope.createRoadtripJsAction = function () {
        var selectedVehicleMake = $rootScope.selectedVehicleMake;
        var selectedVehiclePlateNumber = $rootScope.selectedVehiclePlateNumber;
        
        var RoadtripDate = $scope.dateStartPicker;
        var RoadtripMilesStart = $scope.RoadtripMilesStart;
        var RoadtripMilesStop = $scope.RoadtripMilesStop;
        var TravelDistance = $scope.TravelDistance;
        var StartDestination = $scope.StartDestination;
        var StopDestination = $scope.StopDestination;
        var Matter = $scope.Matter;
        var Note = $scope.Note;


        if (StartDestination == undefined) {
            StartDestination = $scope.myAdress;
        }

        if (StartDestination == "") {
            StartDestination = $scope.myAdress;
        }

        if (StartDestination == undefined) {
            StartDestination = $scope.StartDestination;
        }

        if (RoadtripMilesStart == 0 || RoadtripMilesStop == 0 || StartDestination == null || StopDestination == null || Matter == null || Note == null) {
            var ongoingRoadtripTrueOrFalse = false;
        }
        else {
            var ongoingRoadtripTrueOrFalse = true;
        }


        var postRoadtripObject = {
            VehicleMake: selectedVehicleMake,
            VehiclePlateNumber: selectedVehiclePlateNumber,
            Date: RoadtripDate,
            RoadtripMilesStart: RoadtripMilesStart,
            RoadtripMilesStop: RoadtripMilesStop,
            StartDestination: StartDestination,
            StopDestination: StopDestination,
            Matter: Matter,
            ongoingRoadtrip: ongoingRoadtripTrueOrFalse,
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


    // Get Vehicles In Dropdown
    var getVehiclesUrl = "/api/Vehicles/";

    $rootScope.defaultVehicleForDropdown = "";

    let standardVehicleForDropdown = "";

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        console.log("get vehicles response: ", response);
        $scope.getAvailableVehicles = response.data.availableVehicles;



       // FRÅGA LINUS H_UR MAN FILTRERAR STANDARDBIL

        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {

        console.log("get vehicles ERROR response: ", response);

    });

    
    $scope.dropdownText = "bilen";
    $scope.dropdownText = "Välj bil för din resa";


    
});

app.controller("manageVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {
//-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------ON PAGE LOAD-------------------------------------------
    //-----------------------------------------------------------------------------------------
    var getVehiclesUrl = "/api/Vehicles/";

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        console.log("get vehicles response: ", response);
        $scope.getAvailableVehicles = response.data.availableVehicles;
        

        


        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {

        console.log("get vehicles ERROR response: ", response);

        });
    //-----------------------------------------------------------------------------------------
    //-------------------------------DELETE VEHICLE----------------------------------------------
    //-----------------------------------------------------------------------------------------

    $scope.deleteVehicle = function (Vehicle) {
        console.log("Deleting : ", Vehicle);


        var deleteVehicleId = Vehicle.vehicleId;
        console.log("DeletevehicleID: ", deleteVehicleUrl);


        var deleteVehicleUrl = "/api/Vehicles/" + deleteVehicleId;

        $http.delete(deleteVehicleUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback delete vehilcle ", response);

            

            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response delete vehilcle: " + response);

        });

        
    }

    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------

    


    $scope.setVehicleActive = function (Vehicle) {
        console.log("Setting vehicle Inactive: ", Vehicle);


        var putVehicleId = Vehicle.vehicleId;
        console.log("put Vehicle Id: ", putVehicleId);


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


       //var putFalse = "false";
       // var vehicleSetInactiveObject = {
       //     active: putFalse
       // }
        Vehicle.active = true;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback put vehilcle ", response);



            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response put vehilcle: " + response);

        });


    }


    $scope.setVehicleInActive = function (Vehicle) {
        console.log("Setting vehicle active: ", Vehicle);


        var putVehicleId = Vehicle.vehicleId;
        console.log("put Vehicle Id: ", putVehicleId);


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


        //var putFalse = "false";
        // var vehicleSetInactiveObject = {
        //     active: putFalse
        // }
        Vehicle.active = false;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback put vehilcle ", response);



            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response put vehilcle: " + response);

        });
    }

    $scope.setVehicleStandard = function (Vehicle) {
        console.log("Setting vehicle standard: ", Vehicle);


        var putVehicleId = Vehicle.vehicleId;
        console.log("put Vehicle standard Id: ", putVehicleId);


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


        //var putFalse = "false";
        // var vehicleSetInactiveObject = {
        //     active: putFalse
        // }
        Vehicle.defaultVehicle = true;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

            console.log("SuccessfullCallback put vehilcle ", response);



            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

            console.log("errorCallback response put vehilcle: " + response);

        });
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
app.controller("supportController", function ($scope, $http, $rootScope, $window, $cookies) {




});







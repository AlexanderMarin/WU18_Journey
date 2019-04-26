app.controller("journeyController", function ($scope, $http, $rootScope, $window, $cookies) {



    $rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));




    // GETTING_ ROADTRIPS ON LOAD
    // FIX FILTER ONGOING ROADTRIPS
    var getRoadtripsUrl = "/api/Roadtrip/";

    $http.get(getRoadtripsUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {




        $scope.unfinishedRoadtrips = response.data;





        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


    });

    $scope.completeRoadtripJsFunction = function (roadtrip) {
        var RoadtripId = roadtrip.roadtripId;
        
        var getRoadtripToCompleteByIdUrl = "api/Roadtrip/" + RoadtripId;

        $http.get(getRoadtripToCompleteByIdUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {



            $rootScope.roadtripDate = response.data.date;
            $rootScope.roadtripCarMake = response.data.vehicleMake;
            $rootScope.roadtripCarNumberPlate = response.data.vehiclePlateNumber;
            $rootScope.roadtripStopDestination = response.data.stopDestination;
            $rootScope.roadtripStartDestination = response.data.startDestination;
            $rootScope.roadtripNote = response.data.note;
            $rootScope.roadtripMatter = response.data.matter;
            $rootScope.roadtripMilesStart = response.data.roadtripMilesStart;
            $rootScope.roadtripMilesStop = response.data.roadtripMilesStop;


            









            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


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


            if (result[0]) {
                $scope.myAdress = result[0].formatted_address;
                $scope.$apply();
            }

        });

    };
















     $rootScope.ongoingRoadtripsExist = true;

    var getRoadtripsUrl = "/api/Roadtrip/";

    $http.get(getRoadtripsUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        //Setting if ongoing roadtrips exist
        angular.forEach(response.data, function (item) {
            if (!item.ongoingRoadtrip == true) {
                $rootScope.ongoingRoadtripsExist == false;
                console.log(item.ongoingRoadtrip);
            }

        })

        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


    });


    console.log($rootScope.ongoingRoadtripsExist);

























    //DROPDOWN CAR SELECTION

   

    $scope.selectCarForRoadtrip = function (Vehicle) {
        $scope.dropdownText = Vehicle.make + " " + Vehicle.plateNumber;
        $rootScope.selectedVehicleMake = Vehicle.make;
        $rootScope.selectedVehiclePlateNumber = Vehicle.plateNumber;
        
        
    }
    

    $scope.RoadtripMilesStart = 0;
    $scope.RoadtripMilesStop = 0;

    $scope.completeRoadtripJsAction = function () {
        var completeRoadtripMilesStop = $scope.RoadtripMilesStopcomplete;
        var completeRoadtripStopDestination = $scope.StopDestinationcompleteRoadtrip;
        var completeRoadtripMatter = $scope.MattercompleteRoadtrip;
        var completeRoadtripNote = $scope.NotecompleteRoadtrip;

        if (completeRoadtripStopDestination == null || completeRoadtripMatter == 0 || completeRoadtripNote == null) {
            var completeOngoingRoadtripTrueOrFalse = true;
        }
        else {
            var completeOngoingRoadtripTrueOrFalse = false;
        }


        var postRoadtripObject = {
            RoadtripMilesStop: completeRoadtripMilesStop,
            RoadtripMilesStop: completeRoadtripStopDestination,
            Matter: completeRoadtripMatter,
            ongoingRoadtrip: completeOngoingRoadtripTrueOrFalse,
            Note: completeRoadtripNote
        };


        var postRoadtripUrl = "/api/Roadtrip";

        $http.post(postRoadtripUrl, postRoadtripObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {


            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


        });

    }

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
            var ongoingRoadtripTrueOrFalse = true;
        }
        else {
            var ongoingRoadtripTrueOrFalse = false;
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
            Note: Note
        };


        var postRoadtripUrl = "/api/Roadtrip";

        //if()
        if ($rootScope.ongoingRoadtripsExist == true) {
            console.log("Sorry you must finish you ongoing roadtrip before you can create a new one.");
        }
        else if ($rootScope.ongoingRoadtripsExist == false) {
            $http.post(postRoadtripUrl, postRoadtripObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {
                console.log("postades");


                // If error --------------------------------------------------------------------------------------------------
            }, function errorCallback(response) {

                console.log("error i postingen");
            });
        }
       



    }


    // Get Vehicles In Dropdown
    var getVehiclesUrl = "/api/Vehicles/";

    $rootScope.defaultVehicleForDropdown = "";

   

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        $scope.getAvailableVehicles = response.data.availableVehicles;

        $scope.dropdownText = "bilen";
        $scope.dropdownText = "Välj bil för din resa";


        angular.forEach($scope.getAvailableVehicles, function (item) {

            if (item.defaultVehicle == true) {
                $scope.selectCarForRoadtrip(item);
            }

        })



        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


    });



    
   


    
});

app.controller("manageVehiclesController", function ($scope, $http, $rootScope, $window, $cookies) {
//-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------ON PAGE LOAD-------------------------------------------
    //-----------------------------------------------------------------------------------------
    var getVehiclesUrl = "/api/Vehicles/";

    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        $scope.getAvailableVehicles = response.data.availableVehicles;
        

        


        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


        });
    //-----------------------------------------------------------------------------------------
    //-------------------------------DELETE VEHICLE----------------------------------------------
    //-----------------------------------------------------------------------------------------

    $scope.deleteVehicle = function (Vehicle) {


        var deleteVehicleId = Vehicle.vehicleId;


        var deleteVehicleUrl = "/api/Vehicles/" + deleteVehicleId;

        $http.delete(deleteVehicleUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {


            

            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


        });

        
    }

    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------

    


    $scope.setVehicleActive = function (Vehicle) {


        var putVehicleId = Vehicle.vehicleId;


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


       //var putFalse = "false";
       // var vehicleSetInactiveObject = {
       //     active: putFalse
       // }
        Vehicle.active = true;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {




            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


        });


    }


    $scope.setVehicleInActive = function (Vehicle) {


        var putVehicleId = Vehicle.vehicleId;


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


        //var putFalse = "false";
        // var vehicleSetInactiveObject = {
        //     active: putFalse
        // }
        Vehicle.active = false;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {




            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


        });
    }

    $scope.setVehicleStandard = function (Vehicle) {


        var putVehicleId = Vehicle.vehicleId;


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


        //var putFalse = "false";
        // var vehicleSetInactiveObject = {
        //     active: putFalse
        // }
        Vehicle.defaultVehicle = true;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {




            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


        });
    }

    $scope.setVehicleNotStandard = function (Vehicle) {


        var putVehicleId = Vehicle.vehicleId;


        var putVehicleUrl = "/api/Vehicles/" + putVehicleId;


        //var putFalse = "false";
        // var vehicleSetInactiveObject = {
        //     active: putFalse
        // }
        Vehicle.defaultVehicle = false;



        $http.put(putVehicleUrl, Vehicle, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {




            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


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


        var vehiclePostObject = {
            Make: VehicleMake,
            PlateNumber: VehiclePlateNumber
        };

        var postNewVehicleUrl = "/api/Vehicles/";

        $http.post(postNewVehicleUrl, vehiclePostObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {







            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {


        });
    }




 
});
app.controller("supportController", function ($scope, $http, $rootScope, $window, $cookies) {




});







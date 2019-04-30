app.controller("journeyController", function ($scope, $http, $rootScope, $window, $cookies) {

$rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));




    // GETTING_ ROADTRIPS ON LOAD
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



    $rootScope.findAdressForDestinationComplete = function () {
        var geocoder = new google.maps.Geocoder;

        var latlng = {
            lat: parseFloat($scope.latitude),
            lng: parseFloat($scope.longitude)
        }

        geocoder.geocode({ 'location': latlng }, function (result, status) {


            if (result[0]) {

                $rootScope.myAdressDestinationCompleteRoadtrip = result[0].formatted_address;

                $scope.$apply();
            }

        });


    }

    $scope.completeRoadtripJsAction = function () {

        

        var completeRoadtripMilesStop = $scope.RoadtripMilesStopcomplete;
        var completeRoadtripStopDestination = $scope.StopDestinationcompleteRoadtrip;
        var completeRoadtripMatter = $scope.MattercompleteRoadtrip;
        var completeRoadtripNote = $scope.NotecompleteRoadtrip;

        if (completeRoadtripStopDestination == null || completeRoadtripMatter == 0 || completeRoadtripNote == null) {
            var completeOngoingRoadtripTrueOrFalse = Boolean(JSON.parse(true));
        }
        else {
            var completeOngoingRoadtripTrueOrFalse = Boolean(JSON.parse(false));
        }


        var postRoadtripObject = {
            RoadtripMilesStop: completeRoadtripMilesStop,
            RoadtripMilesStop: completeRoadtripStopDestination,
            Matter: completeRoadtripMatter,
            ongoingRoadtrip: completeOngoingRoadtripTrueOrFalse,
            Note: completeRoadtripNote
        };

        // GEOLOCATION FOR STOP DESINATION ON COMPLETE ROADTRIP
        if (StopDestinationcompleteRoadtrip == undefined) {
            StopDestination = $rootScope.myAdressDestinationCompleteRoadtrip;
        }

        if (StopDestinationcompleteRoadtrip == "") {
            StopDestination = $rootScope.myAdressDestinationCompleteRoadtrip
        }

        if (StopDestinationcompleteRoadtrip == undefined) {
            StopDestination = $scope.StopDestinationcompleteRoadtrip;
        }


        $scope.roadtripSuccessfullyCompleted = Boolean(JSON.parse(false));

        var postRoadtripUrl = "/api/Roadtrip";

        $http.post(postRoadtripUrl, postRoadtripObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {
            $scope.roadtripSuccessfullyCompleted = Boolean(JSON.parse(true));


        }, function errorCallback(response) {


        });

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

    $scope.findAdressForDestination = function () {

        var geocoder = new google.maps.Geocoder;

        var latlng = {
            lat: parseFloat($scope.latitude),
            lng: parseFloat($scope.longitude)
        }

        geocoder.geocode({ 'location': latlng }, function (result, status) {


            if (result[0]) {
                $scope.myAdressDestination = result[0].formatted_address;
                $scope.$apply();
            }

        });


    }

    
  
    
















    $rootScope.ongoingRoadtripsExist = Boolean(JSON.parse(false));

    var getRoadtripsUrl = "/api/Roadtrip/";

    $http.get(getRoadtripsUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        //Setting if ongoing roadtrips exist
        angular.forEach(response.data, function (item) {
            if (!item.ongoingRoadtrip == true) {
                $rootScope.ongoingRoadtripsExist = Boolean(JSON.parse(false));
                console.log(item.ongoingRoadtrip);
            }

        })

        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


    });



























    //DROPDOWN CAR SELECTION

   

    $scope.selectCarForRoadtrip = function (Vehicle) {
        $scope.dropdownText = Vehicle.make + " " + Vehicle.plateNumber;
        $rootScope.selectedVehicleMake = Vehicle.make;
        $rootScope.selectedVehiclePlateNumber = Vehicle.plateNumber;
        
        
    }
    

    $scope.RoadtripMilesStart = 0;
    $scope.RoadtripMilesStop = 0;

    

   // $rootScope.selectedVehicleMake = Vehicle.make;
    // $rootScope.selectedVehiclePlateNumber = Vehicle.plateNumber;
    $scope.$watch("RoadtripMilesStart", function () {
        if ($scope.RoadtripMilesStart != '') {
            $scope.startError = false;
        }
    });
     
    $scope.createRoadtripJsAction = function () {

        // Formulärvalidering för fält som krävs, dessa är bil, datum och startadress!!!!
        if ($scope.RoadtripMilesStart == 0 || $scope.RoadtripMilesStart == null || $scope.RoadtripMilesStart == '') {
            $scope.startError = true;
        } else {

        }


        var selectedVehicleMake = $rootScope.selectedVehicleMake;
        var selectedVehiclePlateNumber = $rootScope.selectedVehiclePlateNumber;
        
        var RoadtripDate = $scope.dateStartPicker;
        var RoadtripMilesStart = $scope.RoadtripMilesStart;
        var RoadtripMilesStop = $scope.RoadtripMilesStop;
        var TravelDistance = $scope.RoadtripMilesStop - $scope.RoadtripMilesStart;
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



        if (StopDestination == undefined) {
            StopDestination = $scope.myAdressDestination;
        }

        if (StopDestination == "") {
            StopDestination = $scope.myAdressDestination;
        }

        if (StopDestination == undefined) {
            StopDestination = $scope.StopDestination;
        }




        
        if (RoadtripMilesStart == 0 || RoadtripMilesStop == 0 || StartDestination == null || StopDestination == null || Matter == null || Note == null) {
            var ongoingRoadtripTrueOrFalse = Boolean(JSON.parse(true));
        }
        else {
            var ongoingRoadtripTrueOrFalse = Boolean(JSON.parse(false));
        }


        var postRoadtripObject = {
            VehicleMake: selectedVehicleMake,
            VehiclePlateNumber: selectedVehiclePlateNumber,
            Date: RoadtripDate,
            RoadtripMilesStart: RoadtripMilesStart,
            TravelDistance: TravelDistance,
            RoadtripMilesStop: RoadtripMilesStop,
            StartDestination: StartDestination,
            StopDestination: StopDestination,
            Matter: Matter,
            ongoingRoadtrip: ongoingRoadtripTrueOrFalse,
            Note: Note
        };


       
        
      

        var postRoadtripUrl = "/api/Roadtrip";

        $scope.roadtripSuccessfullyCreated = Boolean(JSON.parse(false));
        $scope.roadtripNotCreated = Boolean(JSON.parse(false));


    
            $http.post(postRoadtripUrl, postRoadtripObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {
                console.log("postades");
                $scope.roadtripSuccessfullyCreated = Boolean(JSON.parse(true));
                console.log(response);

                // If error --------------------------------------------------------------------------------------------------
            }, function errorCallback(response) {
                var errors = response.status;
                console.log(response, "errors: ", errors, "Det finns redan pågående resor och därför returnerar jag ett fel så det inte går att posta.");
                if (errors = 400) {
                    
                }
                $scope.roadtripNotCreated = Boolean(JSON.parse(true));
            });
        
       
        


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

        $scope.vehicleDeletedSuccessfully = Boolean(JSON.parse(false));
        var deleteVehicleId = Vehicle.vehicleId;


        var deleteVehicleUrl = "/api/Vehicles/" + deleteVehicleId;

        $http.delete(deleteVehicleUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {


            $scope.vehicleDeletedSuccessfully = Boolean(JSON.parse(true));

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
        $scope.vehicleAddedSuccessfully = Boolean(JSON.parse(false));
        

        // POSTING NEW CAR ON DATABASE ----------------------------------------



        var VehicleMake = $scope.VehicleMake;
        var VehiclePlateNumber = $scope.VehiclePlateNumber;


        var vehiclePostObject = {
            Make: VehicleMake,
            PlateNumber: VehiclePlateNumber,
            active: true
        };

        var postNewVehicleUrl = "/api/Vehicles/";

        $http.post(postNewVehicleUrl, vehiclePostObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {




        $scope.vehicleAddedSuccessfully = Boolean(JSON.parse(true));



            // If error --------------------------------------------------------------------------------------------------
        }, function errorCallback(response) {

        });
    }




 
});
app.controller("supportController", function ($scope, $http, $rootScope, $window, $cookies) {

    $scope.messages = [];

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.start();

    $scope.send = function () {
        console.log("knapen");
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

        connection.invoke("SendMessage", $scope.user.name, $scope.user.message, time);
    }
                   
    connection.on("RecieveMessage", function (name, message, time) {
   
        // $scope.senderIsSupport = false;

        var newChat = { name: name, message: message, time: time };

        //if (name == "support" || name == "Support") {
        //    $scope.senderIsSupport == true;
        //}
       
        $scope.messages.push(newChat);

        $scope.$apply();
    });

  


});
app.controller("rapportController", function ($scope, $http, $rootScope, $window, $cookies) {

    var getVehiclesUrl = "/api/Vehicles/";
    $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

        $scope.getAvailableVehicles = response.data.availableVehicles;





        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


    });

    //$scope.selectCarForRapport = function (Vehicle) {
    //    $scope.dropdownTextForReport = Vehicle.make + " " + Vehicle.plateNumber;
    //    $rootScope.selectedVehicleMake = Vehicle.make;
    //    $rootScope.selectedVehiclePlateNumber = Vehicle.plateNumber;
    //    $scope.vehiclePlateNumberForReport = Vehicle.plateNumber;

    //}


    


    $scope.createPdfJsAction = function () {
        let pdfPost = {
            LicensePlate: $scope.selectVehicle,
            DateTimeStart: $scope.DateTimeStartReport,
            DateTimeStop: $scope.DateTimeStopReport
        }

        $http.post("/api/pdf", pdfPost).then(function (response) {
            $window.open('/pdf/' + $scope.selectVehicle + '.pdf', '_blank');
        })
    }

    $scope.createReportJsAction = function () {

        let post = {
            LicensePlate: $scope.selectVehicle,
            DateTimeStart: $scope.DateTimeStartReport,
            DateTimeStop: $scope.DateTimeStopReport
        }

        $http.post("/api/rapport", post).then(function (response) {
            $scope.data = response.data;
            console.log(response);
            $scope.labels = ["0-20km", "21-50km", "51-200km"];

            $scope.options = {
                legend: {
                    display: true,
                    position: "bottom"
                },
                tooltipEvents: [],
                showTooltips: true,
                tooltipCaretSize: 0,
                onAnimationComplete: function () {
                    this.showTooltip(this.segments, true);
                },
            };

        })
    }



});




app.controller("journeyController", function ($scope, $http, $rootScope, $window, $cookies) {

    $rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));

    // GOOGLE GEOLOCATION---------------------GOOGLE GEOLOCATION---------------------GOOGLE GEOLOCATION---------------------GOOGLE GEOLOCATION---------------------
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
    // GOOGLE GEOLOCATION--------------------- GOOGLE GEOLOCATION--------------------- GOOGLE GEOLOCATION--------------------- GOOGLE GEOLOCATION---------------------
    
    // GETTING ADRESS FOR START completeDestinationADRESS---------------------------------------------GETTING ADRESS FOR START completeDestinationADRESS---------------------------------------------
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
    // GETTING ADRESS FOR START completeDestinationADRESS---------------------------------------------GETTING ADRESS FOR START completeDestinationADRESS---------------------------------------------


    // GETTING ROADTRIPS ON LOAD-----------------GETTING ROADTRIPS ON LOAD-----------------GETTING ROADTRIPS ON LOAD-----------------GETTING ROADTRIPS ON LOAD-----------------
    var getRoadtripsUrl = "/api/Roadtrip/";
    $http.get(getRoadtripsUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {
        // inte implementerad men orkar inte ta bort den och testa ifall de funkar ändå
        $scope.unfinishedRoadtrips = response.data;
    }, function errorCallback(response) {
    });
    // GETTING ROADTRIPS ON LOAD-----------------GETTING ROADTRIPS ON LOAD-----------------GETTING ROADTRIPS ON LOAD-----------------GETTING ROADTRIPS ON LOAD-----------------


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
// start of controller



    // GOOGLE GEOLOCATION ----------------------GOOGLE GEOLOCATION ----------------------------------------GOOGLE GEOLOCATION ----------------------------------------------
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

    // GETTING ADRESS FOR START ADRESS
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
    // GETTING ADRESS FOR START ADRESS

    // GETTING ADRESS FOR DESTINATION ADRESS
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
    // GETTING ADRESS FOR DESTINATION ADRESS
    
    // GOOGLE GEOLOCATION ----------------------GOOGLE GEOLOCATION ----------------------------------------GOOGLE GEOLOCATION ----------------------------------------------












    // INGEN ANING ----------------------INGEN ANING ----------------------------------------INGEN ANING ----------------------------------------------
    $rootScope.ongoingRoadtripsExist = Boolean(JSON.parse(false));

    var getRoadtripsUrl = "/api/Roadtrip/";

    $http.get(getRoadtripsUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {

      

        // If error --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {


    });
    // INGEN ANING ----------------------INGEN ANING ----------------------------------------INGEN ANING ----------------------------------------------



























    //DROPDOWN CAR SELECTION----------------------------------DROPDOWN CAR SELECTION----------------------------------DROPDOWN CAR SELECTION----------------------------------
        $scope.selectCarForRoadtrip = function (Vehicle) {
        $scope.dropdownText = Vehicle.make + " " + Vehicle.plateNumber;
        $rootScope.selectedVehicleMake = Vehicle.make;
        $rootScope.selectedVehiclePlateNumber = Vehicle.plateNumber;
         }
   //DROPDOWN CAR SELECTION----------------------------------DROPDOWN CAR SELECTION----------------------------------DROPDOWN CAR SELECTION----------------------------------


    $scope.RoadtripMilesStart = 0;
    $scope.RoadtripMilesStop = 0;

    
 
     
    $scope.createRoadtripJsAction = function () {





        // MÅSTE HA MILES START DATUM OCH STARTADRESS OCH BIL FÖR ATT STARTA

        // REST CAN BE COMPLETED

        // Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering-------------------- 
        // för fält som krävs, dessa är bil, datum och startadress
        if ($scope.RoadtripMilesStart == 0 || $scope.RoadtripMilesStart == null || $scope.RoadtripMilesStart == '') {
            $scope.startError = true;
        } else {

        }
        // Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------Formulärvalidering--------------------


        // LADDAR INFO FRÅN SCOPET TILL VARIABLER FÖR ATT POSTA-----------------------------
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
        // LADDAR INFO FRÅN SCOPET TILL VARIABLER FÖR ATT POSTA-----------------------------

        // RESOLVES WHETER TYPED ADRESS OR GOOGLE GEOLOCATION ADRESS I LOADED - FOR START ADRESS
        if (StartDestination == undefined) {
            StartDestination = $scope.myAdress;
        }
        if (StartDestination == "") {
            StartDestination = $scope.myAdress;
        }
        if (StartDestination == undefined) {
            StartDestination = $scope.StartDestination;
        }
        // RESOLVES WHETER TYPED ADRESS OR GOOGLE GEOLOCATION ADRESS I LOADED FOR START ADRESS


        // RESOLVES WHETER TYPED ADRESS OR GOOGLE GEOLOCATION ADRESS I LOADED FOR DESTINATION ADRESS
        if (StopDestination == undefined) {
            StopDestination = $scope.myAdressDestination;
        }

        if (StopDestination == "") {
            StopDestination = $scope.myAdressDestination;
        }

        if (StopDestination == undefined) {
            StopDestination = $scope.StopDestination;
        }
        // RESOLVES WHETER TYPED ADRESS OR GOOGLE GEOLOCATION ADRESS I LOADED FOR DESTINATION ADRESS


        // GÖR BÄTTRE VALIDATION FÖR ALLA TRE I TRE FORMAT TYP LER NGT

        // RESOLVES WHETER ROADTRIP GET ATTRIBUTE OF ONGOING(TRUE) OR FALSE-------------------------
        if (RoadtripMilesStop == 0 || StopDestination == null || Matter == null) {
            var ongoingRoadtripTrueOrFalse = Boolean(JSON.parse(true));
        }
        else {
            var ongoingRoadtripTrueOrFalse = Boolean(JSON.parse(false));
        }
        // RESOLVES WHETER ROADTRIP GET ATTRIBUTE OF ONGOING(TRUE) OR FALSE-------------------------


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

      


        // DEKLARERAR FALSE VÄRDEN FÖR NG VIEW FÖR ATT SEDAN KUNNA LÄGGA IN DESSA VÄRDEN SOM TRUE I OLIKA SCENARION SOM TILL EXEMPEL SUCCESS
        // ELLER ERROR PÅ POST. OM VÄRDEN ÄR TRUE KOMMER MEDDELANDEN VISAS PÅ HEMSIDAN VIA NG-SHOW
        $scope.roadtripSuccessfullyCreated = Boolean(JSON.parse(false));
        $scope.roadtripNotCreated = Boolean(JSON.parse(false));


            var postRoadtripUrl = "/api/Roadtrip";
            $http.post(postRoadtripUrl, postRoadtripObject, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {
                //NG-SHOW MEDDELANDE
                $scope.roadtripSuccessfullyCreated = Boolean(JSON.parse(true));

                // If error --------------------------------------------------------------------------------------------------
            }, function errorCallback(response) {
                var errors = response.status;
                console.log(response, "errors: ", errors, "Det finns redan pågående resor och därför returnerar jag ett fel så det inte går att posta.");
                //NG-SHOW MEDDELANDE
                $scope.roadtripNotCreated = Boolean(JSON.parse(true));
            });
        
       
        


    }

   
        // Get Vehicles In Dropdown

        var getVehiclesUrl = "/api/Vehicles/";
        $http.get(getVehiclesUrl, { headers: { 'Authorization': 'Bearer ' + $rootScope.loggedInUser.CookieWithToken } }).then(function successCallback(response) {
            // LADDAR VEHICLES I SCOPE VARIABEL OCH ANVÄNDER DEN I EN NG REPEAT I HTML
            $scope.getAvailableVehicles = response.data.availableVehicles;


            // BASICALLY GÅR IGENOM ALLA VEHICLES VI HÄMTAT OCH KOLLAR OM DEN HAR
            // 'defaultVehicle: true' OCH I SÅ FALL VÄLJER DEN MED FUNKTIONEN NEDAN

        angular.forEach($scope.getAvailableVehicles, function (item) {
            if (item.defaultVehicle == true) {

                // DETTA ÄR EN FUNKTION SOM ÄR DEKLARERAD NÅGON ANNAN STANS RAD 298
                $scope.selectCarForRoadtrip(item);
            }
        })
         // Error callback på createRoadtripJsAction --------------------------------------------------------------------------------------------------
    }, function errorCallback(response) {
    });

// end of controller 
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




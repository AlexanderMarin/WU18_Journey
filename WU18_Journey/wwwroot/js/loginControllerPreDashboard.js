loginAngularPreDashboard.controller("journeyLoginController", function ($scope, $http, $rootScope, $window, $cookies) {

   

    $rootScope.loggedInUser = JSON.parse($cookies.get("loggedInUser"));

   

    console.log("$rootScope.loggedInUser ", $rootScope.loggedInUser);
   
   

    $scope.logInJsAction = function () {

        var loginEmail = $scope.loginEmail;
        var loginPassword = $scope.loginPassword;

        console.log("loginEmail: " + loginEmail);
        console.log("loginPassword: " + loginPassword);

        var loginPostObject = {
            Email: loginEmail,
            Password: loginPassword
        };

        console.log("loginPostObject: " + loginPostObject);


        var url = "/api/Users/";

        $http.post(url, loginPostObject).then(function successCallback(response) {

            console.log("SuccessfullCallback response: ", response);

            var userEmail = response.data.email;
            var userId = response.data.userId;

            console.log("errorCallback response userEmail: ", userEmail);
            console.log("errorCallback response userId: ", userId);

            $scope.userEmail = userEmail;

            userEmail = globalUserEmail;
            userId = globarUserId;

            // window.location.replace("/dashboard.html");

        }, function errorCallback(response) {

                console.log("errorCallback response for login: ", response);
            });



    }

   
    $scope.ClickLoginTest = function () {

        // testing login api identity




        var loginemail = $scope.loginEmail;
        var loginpassword = $scope.loginPassword;

        console.log(loginemail);
        console.log(loginpassword);




        var data = {
            email: loginemail,
            password: loginpassword
        };

        $http.post('/token', data).then(function (response) {
            $rootScope.token = response.data.token;
            


            console.log('response: ', response);

            //------------------------------------
            $http.get('/api/User', { headers: { 'Authorization': 'Bearer ' + $rootScope.token } }).then(function (response) {
                var responseFromApi = response;
                console.log('token: ', responseFromApi);

                let loggedInUser = {};
                loggedInUser.Email = responseFromApi.data.email;
              //  loggedInUser.Availablevehicles = responseFromApi.data.availableVehicles;
                loggedInUser.CookieWithToken = $rootScope.token;

                var now = new Date(),
                    // this will set the expiration to 12 months
                    exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

             //  $cookies.put("loggedInUser", JSON.stringify(loggedInUser));

                

                $cookies.put("loggedInUser", JSON.stringify(loggedInUser), {
                    expires: exp
                });

                console.log("$rootScope.loggedInUser ", loggedInUser);

                var landingUrl = "dashboard.html";
                $window.location.href = landingUrl;
           

            }, function (error) {
                var responseFromApi = error;
                console.log('error: ', responseFromApi);
                });


        }
            , function (err) {
                console.log('errpr: ', err);
            });

        

    }; // Login works

    $scope.registerJsAction = function () {

        let PostObject = {
            email: $scope.registerEmail,
            password: $scope.registerPassword
        };

        $http.post("/register", PostObject).then(function (response) {

            $scope.errors = response.data.errors;

            if (response.data.succeeded) {
                alert("Användaren registrerades.");
                $scope.email = "";
                $scope.password = "";
            }

            console.log(response);

        });

    }


    
});







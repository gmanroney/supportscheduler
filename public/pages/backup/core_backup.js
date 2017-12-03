
var swof = angular.module('swof', ['ngroute']);

swof.config(function($routeProvider) {
  $routeProvider
  .when ('/', {
    templateUrl: 'pages/home.html'
    controller: 'mainController'
  }),
  .when ('/engineer', {
    templateUrl: 'pages/engineer.html'
    controller: 'engineerController'
  }),
  .when ('/schedule', {
    templateUrl: 'pages/schedule.html'
    controller: 'scheduleController'
  })
});

swof.controller('mainController', ['$scope', '$location', '$log',
function ($scope, $location, $log) {
  $log.info($location.path());
}]);


function engineerController($scope, $http) {

    // when landing on the page, get all engineers and show them
    $http.get('/api/engineers')
        .success(function(data) {
            $scope.engineers = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      };

function scheduleController($scope, $http)
{

    // when landing on the page, get all schedules and show them
    $http.get('/api/schedules/2017/49')
        .success(function(data) {
            $scope.schedules = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      };


      $scope.login = function () {
        $scope.btntext = "Please wait...!";
        $http({
            method: "POST",
            url: '/Home/userlogin', // link UserLogin with HomeController
            data: $scope.user
         }).then(function (response) {
            console.log("Result value is : " + parseInt(response));
            data = response.data;
            $scope.btntext = 'Login';
            if (data == 1) {
                window.location.href = '/Home/dashboard';
             }
            else {
            alert(data);
        }
        }, function (error) {

        alert("Failed Login");
        });

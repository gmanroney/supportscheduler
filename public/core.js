var swof = angular.module('swof', ['ngRoute']);

swof.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })

    .when('/engineer', {
        templateUrl: 'pages/engineer.html',
        controller: 'engineerController'
    })

    .when('/schedule', {
        templateUrl: 'pages/schedule.html',
        controller: 'scheduleController'
    })

    .when('/help', {
        templateUrl: 'pages/help.html',
        controller: 'helpController'
    })
});

swof.controller('aboutController', ['$scope', '$log', function($scope, $log) {

    $scope.name = 'About';

}]);

swof.controller('engineerController', ['$scope', '$log', '$http', function($scope, $log, $http) {

    $scope.name = 'Engineer';
    // when landing on the page, get all engineers and show them
    $http.get('/api/engineers')
        .then (function(data) {
            $scope.engineers = data;
            console.log(data);
            console.log($scope);
        }, function(data) {
          console.log('Error: ' + data);
      });
}]);

swof.controller('scheduleController', ['$scope', '$log', '$http', function($scope, $log, $http) {

    $scope.name = 'Schedule';
    // when landing on the page, get all schedules and show them
    $http.get('/api/schedules/2017/49')
        .then (function(data) {
            $scope.schedules = data;
            console.log(data);
        }, function(data) {
            console.log('Error: ' + data);
        });
}]);

swof.controller('helpController', ['$scope', '$log', function($scope, $log) {

    $scope.name = 'Help';

}]);

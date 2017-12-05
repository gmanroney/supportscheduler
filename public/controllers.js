swof.controller('aboutController', ['$scope', '$log', function($scope, $log) {

    $scope.name = 'aboutController';
    $log.info('Controller: '+ $scope.name);

}]);

swof.controller('engineerController', ['$scope', '$log', '$http', function($scope, $log, $http) {

    $scope.name = 'engineerController';
    $log.info('Controller: '+ $scope.name);

    // when landing on the page, get all engineers and show them
    $http.get('/api/engineers')
        .then (function(data) {
            $scope.engineers = data;
            console.log(data);
        }, function(data) {
          $log.error();('Error: ' + data);
      });

      $scope.getEmpidSchedule = function(userid) {

        $http.get('/api/schedules/empid/'+userid)
              .then (function(data) {
                $scope.empidSchedules = data;
                console.log(data);
              }, function(data) {
                $log.error();('Error: ' + data);
              })};
}]);

swof.controller('scheduleController', ['$scope', '$log', '$http', 'hexafy', function($scope, $log, $http, hexafy) {

  $scope.name = 'scheduleController';
  $log.info('Controller: '+ $scope.name);

  $scope.years = ["2017", "2018", "2019"];
  $scope.selectedYear = "2017";
  $scope.selectedPeriod = 1;

  $scope.hex = hexafy.myFunc(255);
  // when landing on the page, get all schedules and show them
  $http.get('/api/schedules')
        .then (function(data) {
            $scope.schedules = data;
            console.log(data);
        }, function(data) {
          $log.error();('Error: ' + data);
        });

  $scope.getSchedule = function() {

          $http.get('/api/schedules/'+$scope.selectedYear+'/'+$scope.selectedPeriod)
          .then (function(data) {
            $scope.schedules = data;
            console.log(data);
          }, function(data) {
            $log.error();('Error: ' + data);
          })};

  $scope.genSchedule = function() {

          $http.post('/api/schedules/'+$scope.selectedYear+'/'+$scope.selectedPeriod)
          .then (function(data) {
            $scope.schedulegen = data;
           console.log(data);
          }, function(data) {
              $log.error();('Error: ' + data);
          })};
  //$scope.getSchedule = function () {
  //  $log.info("Retrieving schedule");
  //  console.log($scope);
  //};

}]);

swof.controller('helpController', ['$scope', '$log', function($scope, $log) {

  $scope.name = 'helpController';
  $log.info('Controller: '+ $scope.name);

}]);

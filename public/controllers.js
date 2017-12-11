swof.controller('aboutController', ['$scope', '$log', function($scope, $log) {

    $scope.name = 'aboutController';
    $log.info('Controller: '+ $scope.name);

}]);

swof.controller('engineerScheduleController', ['$scope', '$log', '$http', 'engSchedService', function($scope, $log, $http, engSchedService ) {

    $scope.name = 'engineerScheduleController';
    $scope.empschedid = engSchedService.empschedid;
    $log.info('Controller: '+ $scope.name);

    $http.get('/api/schedules/empid/'+ $scope.empschedid)
    .then (function(data)
    {
      $scope.empidSchedules = data;
      console.log(data);
    }, function(data) {
      $log.error();('Error: ' + data);
    });

}]);

swof.controller('engineerController', ['$scope', '$log', '$http',  'engSchedService', function($scope, $log, $http, engSchedService ) {

    $scope.name = 'engineerController';
    $log.info('Controller: '+ $scope.name);

    $scope.empschedid = engSchedService.empschedid;
    $scope.$watch('empschedid', function() {
      engSchedService.empschedid = $scope.empschedid;
    });

    // when landing on the page, get all engineers and show them
    $http.get('/api/engineers')
        .then (function(data) {
            $scope.engineers = data;
            console.log(data);
            $scope.engineersCount = data.data.length;
        }, function(data) {
          $log.error();('Error: ' + data);
      });

    $scope.getEmpidSchedule = function(userid)
    {
      $scope.empschedid = userid;
      console.log($scope.empschedid);
    };
}]);

swof.controller('scheduleController', ['$scope', '$log', '$http', '$filter', function($scope, $log, $http, $filter) {

  $scope.name = 'scheduleController';
  $log.info('Controller: '+ $scope.name);
  console.log($filter('date')(new Date(), 'w'));
  $scope.years = ["2017", "2018", "2019"];
  $scope.selectedYear = "2017";
  $scope.selectedPeriod = Number(( ($filter('date')(new Date(), 'ww')) %2 == 0) ? ($filter('date')(new Date(), 'ww')) : (($filter('date')(new Date(), 'ww')) - 1));

  // when landing on the page, get all schedules and show them
  $http.get('/api/schedules')
        .then (function(data) {
            $scope.schedules = data;
            console.log(data);
            $scope.schedulesCount = data.data.length;
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

}]);

swof.controller('helpController', ['$scope', '$log', function($scope, $log) {

  $scope.name = 'helpController';
  $log.info('Controller: '+ $scope.name);

}]);

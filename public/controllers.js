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
            $scope.engineersCount = data.data.length;
        }, function(data) {
          $log.error();('Error: ' + data);
      });

    $scope.getEmpidSchedule = function(userid)
    {
      $scope.empschedid = userid;
    };
}]);

swof.controller('scheduleController', ['$scope', '$log', '$http', '$filter', function($scope, $log, $http, $filter) {

  $scope.name = 'scheduleController';
  $log.info('Controller: '+ $scope.name);
  //console.log($filter('date')(new Date(), 'w'));
  $scope.years = ["2017", "2018", "2019"];
  $scope.selectedYear = "2017";
  $scope.selectedPeriod = Number(( ($filter('date')(new Date(), 'ww')) %2 == 0) ? ($filter('date')(new Date(), 'ww')) : (($filter('date')(new Date(), 'ww')) - 1));

  // when landing on the page, get all schedules and show them
  $http.get('/api/schedules')
        .then (function(data) {
            $scope.schedules = data;
            $scope.schedulesCount = data.data.length;
        }, function(data) {
          $log.error();('Error: ' + data);
        });

  $scope.getSchedule = function() {

          $http.get('/api/schedules/'+$scope.selectedYear+'/'+$scope.selectedPeriod)
          .then (function(data) {
            $scope.schedules = data;
          }, function(data) {
            $log.error();('Error: ' + data);
          })};

  $scope.genSchedule = function() {

          $http.post('/api/schedules/'+$scope.selectedYear+'/'+$scope.selectedPeriod)
          .then (function(data) {
            $scope.schedulegen = data;
          }, function(data) {
              $log.error();('Error: ' + data);
          })};

}]);

swof.controller('scheduleCalendarDisplay',[ '$scope', '$log', '$http', '$filter', 'moment', 'alert', 'calendarConfig', function($scope, $log, $http, $filter, moment, alert, calendarConfig) {

  var vm = this;
  //These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'month';
  vm.viewDate = new Date();

  //Get all the data when nagivating to this page. This is ok for starters but will need to be enchanced
  // - automatically update when schedule is recalculated
  // - allow user to refresh as/when required without having to navigate away and Back
  // - allow for retrieving only the data needed in the current view (day/week/month/year)
  // - allow for retrieving only the data for a particular worker
  $http.get('/api/schedules')
        .then (function(data) {
            $scope.schedules = data;
            $scope.schedulesCount = data.data.length;
            for (var i=0; i < data.data.length; i++ ) {
              if ( data.data[i].shift == 0 )
              {
                var startsAt=moment(data.data[i]["date"]).add(9,'hour');
                var endsAt=moment(startsAt).add(4,'hour');
                var eventColor=calendarConfig.colorTypes.warning;
              } else {
                var startsAt=moment(data.data[i]["date"]).add(14,'hour');
                var endsAt=moment(startsAt).add(4,'hour');
                var eventColor=calendarConfig.colorTypes.important;
              };
              vm.events.push({
                title: 'empid:' + data.data[i]["empid"],
                startsAt: new Date(startsAt),
                endsAt: new Date(endsAt),
                color: eventColor,
                draggable: false,
                resizable: false
              });
            };

        }, function(data) {
          $log.error();('Error: ' + data);
        });

  vm.cellIsOpen = true;

  vm.eventClicked = function(event) {
    alert.show('Clicked', event);
    console.log("at vmCellclicked :-)");

  };



  vm.timespanClicked = function(date, cell) {

    if (vm.calendarView === 'month') {
      if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        console.log("at vmCellisopen/month :-)");
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    } else if (vm.calendarView === 'year') {
      if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
        console.log("at vmCellisopen/year :-)");
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    }

  };

}]);

swof.controller('helpController', ['$scope', '$log', function($scope, $log) {

  $scope.name = 'helpController';
  $log.info('Controller: '+ $scope.name);

}]);

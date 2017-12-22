swof.controller('aboutController', ['$scope', '$log', function($scope, $log) {

    $scope.name = 'aboutController';
    $log.info('Controller: '+ $scope.name);

}]);

swof.controller('engineerScheduleController', ['$scope', '$log', '$http', 'engSchedService', function($scope, $log, $http, engSchedService ) {

    $scope.name = 'engineerScheduleController::extract list of schedules for a particular engineer';
    $scope.empschedid = engSchedService.empschedid;
    $log.info('Controller: '+ $scope.name);

    $http.get('/api/schedules/'+ $scope.empschedid)
    .then (function(data)
    {
      $scope.empidSchedules = data;
    }, function(data) {
      $log.error();('Error: ' + data);
    });

}]);

swof.controller('engineerController', ['$scope', '$log', '$http', 'engSchedService', 'engineerService', function($scope, $log, $http, engSchedService, engineerService ) {

    $scope.name = 'engineerController::extract list of all engineers';
    $log.info('Controller: '+ $scope.name);

    // use of $watch to assign empid to service shared with other controller so value can be passed between both
    $scope.empschedid = engSchedService.empschedid;
    $scope.$watch('empschedid', function() {
      engSchedService.empschedid = $scope.empschedid;
    });

    // using of factory service and ngresource to manage RESTful calls makes code cleaner
    // and easier to maintain as one location where url's are defined
    engineerService.query().$promise.then(function(data)
    {
      $scope.engineers = data;
    });

    // get value of empid when button is clicked
    $scope.getEmpidSchedule = function(userid)
    {
      $scope.empschedid = userid;
    };
}]);

swof.controller('scheduleController', ['$scope', '$log', '$http', '$filter','moment', 'scheduleService', function($scope, $log, $http, $filter, moment, scheduleService) {

  $scope.name = 'scheduleController::set default values and provide function to generate new schedule';
  $log.info('Controller: '+ $scope.name);
  $scope.years = ["2017", "2018", "2019"];
  $scope.selectedYear = "2017";
  $scope.selectedPeriod = Math.ceil(moment().format('w')) | 1 ;

  $scope.genSchedule = function() {

          $http.post('/api/schedules/period/'+$scope.selectedYear+'/'+$scope.selectedPeriod)
          .then (function(data) {
            $scope.schedulegen = data;
            $scope.genScheduleResponse=moment().format('h:mm:ss a') + " " + data.data.message;
          }, function(data) {
              $log.error();('Error: ' + data);
          })};
}]);

swof.controller('scheduleCalendarDisplay',[ '$scope', '$log', '$http', '$filter', 'moment', 'alert', 'calendarConfig', 'scheduleService', function($scope, $log, $http, $filter, moment, alert, calendarConfig, scheduleService) {

  $scope.name = 'scheduleCalendarDisplay::display schedules in calendar format for all workers';
  $log.info('Controller: '+ $scope.name);

  var vm = this;
  //These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'month';
  vm.viewDate = new Date();

  //Get all the data when nagivating to this page. This is ok for starters but will need to be enchanced
  // - automatically update when schedule is recalculated
  // - allow user to refresh as/when required without having to navigate away and Back
  // - allow for retrieving only the data needed in the current view (day/week/month/year)
  // - allow for retrieving only the data for a particular worker

  $scope.queryParams={empid: "6123"};
  $scope.queryParams="";

  scheduleService.query($scope.queryParams).$promise.then(function(data)
  {
            $scope.schedules = data;
            $scope.schedulesCount = data.length;
            for (var i=0; i < data.length; i++ ) {
              if ( data[i].shift == 0 )
              {
                var startsAt=moment(data[i]["date"]).add(9,'hour');
                var endsAt=moment(startsAt).add(4,'hour');
                var eventColor=calendarConfig.colorTypes.warning;
              } else {
                var startsAt=moment(data[i]["date"]).add(14,'hour');
                var endsAt=moment(startsAt).add(4,'hour');
                var eventColor=calendarConfig.colorTypes.important;
              };
              vm.events.push({
                title: 'empid:' + data[i]["empid"],
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

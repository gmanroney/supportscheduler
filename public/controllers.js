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

swof.controller('scheduleCalendarDisplay', function(moment, alert, calendarConfig) {

  var vm = this;

  //These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'month';
  vm.viewDate = new Date();
  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function(args) {
      alert.show('Edited', args.calendarEvent);
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function(args) {
      alert.show('Deleted', args.calendarEvent);
    }
  }];
  vm.events = [
    {
      title: 'An event',
      color: calendarConfig.colorTypes.warning,
      startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
      endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
      draggable: true,
      resizable: true,
      actions: actions
    }, {
      title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
      color: calendarConfig.colorTypes.info,
      startsAt: moment().subtract(1, 'day').toDate(),
      endsAt: moment().add(5, 'days').toDate(),
      draggable: true,
      resizable: true,
      actions: actions
    }, {
      title: 'This is a really long event title that occurs on every year',
      color: calendarConfig.colorTypes.important,
      startsAt: moment().startOf('day').add(7, 'hours').toDate(),
      endsAt: moment().startOf('day').add(19, 'hours').toDate(),
      recursOn: 'year',
      draggable: true,
      resizable: true,
      actions: actions
    }
  ];

  vm.cellIsOpen = true;

  vm.addEvent = function() {
    vm.events.push({
      title: 'New event',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: calendarConfig.colorTypes.important,
      draggable: true,
      resizable: true
    });
  };

  vm.eventClicked = function(event) {
    alert.show('Clicked', event);
  };

  vm.eventEdited = function(event) {
    alert.show('Edited', event);
  };

  vm.eventDeleted = function(event) {
    alert.show('Deleted', event);
  };

  vm.eventTimesChanged = function(event) {
    alert.show('Dropped or resized', event);
  };

  vm.toggle = function($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  vm.timespanClicked = function(date, cell) {

    if (vm.calendarView === 'month') {
      if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    } else if (vm.calendarView === 'year') {
      if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    }

  };

});

swof.controller('helpController', ['$scope', '$log', function($scope, $log) {

  $scope.name = 'helpController';
  $log.info('Controller: '+ $scope.name);

}]);

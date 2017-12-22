// service to pass empid between engineerController and engineerScheduleController
swof.service('engSchedService', function() {
  this.empschedid="";
});

// service to manage RESTful calls for engineer data object
swof.factory('engineerService', function($resource)
{
  var data = $resource('/api/engineers/:empid',{empid: "@empid"},
  {
    'get':
    {
      method:'GET'
    },
    'query':
    {
      method:'GET',
      transformResponse: function(data)
      {
        return angular.fromJson(data);
      },
      isArray:true
    }
  });
  return data;
});

// service to manage RESTful calls for engineer data object
swof.factory('scheduleService', function($resource)
{
  //console.log("empid = ", params);
  //var data = $resource('/api/schedules/:empid',{empid: "@empid"},
  var data = $resource('/api/schedules/:empid',{empid: "@empid"},
  {
    'query':
    {
      method: 'GET',
      params: {},
      transformResponse: function(data)
      {
        return angular.fromJson(data);
      },
      isArray:true
    }
  });
  return data;
});

// service to populate modal page for calendar
swof.factory('alert', function($uibModal) {

  function show(action, event) {
    return $uibModal.open({
      templateUrl: 'pages/engineers_schedule_one_modal.html',
      controller: function() {
        var vm = this;
        vm.action = action;
        vm.event = event;
      },
      controllerAs: 'vm'
    });
  }

  return {
    show: show
  };

});

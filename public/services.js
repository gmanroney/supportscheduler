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
    'save':
    {
      method:'POST'
    },
    'query':
    {
      method:'GET',
      transformResponse: function(data)
      {
        return angular.fromJson(data);
      },
      isArray:true
    },
    'remove':
    {
      method:'DELETE'
    },
    'delete':
    {
      method:'DELETE'
    }
  });
  return data;
});

// service to populate modal page for calendar
swof.factory('alert', function($uibModal) {
  console.log("ssss");

  function show(action, event) {
    return $uibModal.open({
      templateUrl: 'pages/engineerShiftModal.html',
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

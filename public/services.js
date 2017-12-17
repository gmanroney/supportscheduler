swof.service('engSchedService', function() {
  this.empschedid="999";
});

swof.factory('alert', function($uibModal) {
  console.log("ssss");

  function show(action, event) {
    return $uibModal.open({
      templateUrl: 'pages/modalContent.html',
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

var app = angular.module('swf', []);

function EngineerCtrl($scope, $http) {

    $scope.engineers = [];

    $scope.loadEngineers = function() {
      $http.get('/api/engineers')
          .success(function(data) {
              $scope.engineers = data;
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
        };
      }

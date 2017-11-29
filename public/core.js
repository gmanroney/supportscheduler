var swof = angular.module('swof', []);

function engineerController($scope, $http) {

    // when landing on the page, get all engineers and show them
    $http.get('/api/engineers')
        .success(function(data) {
            $scope.engineers = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      }

function scheduleController($scope, $http)
{

    $scope.sortType     = 'empid'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = 'none';     // set the default search/filter term

    // when landing on the page, get all schedules and show them
    $http.get('/api/schedules/2017/49')
        .success(function(data) {
            $scope.schedules = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      }

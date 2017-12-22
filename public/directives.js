swof.directive('myEngineerlisttable', function(){
    return {
      restrict: 'EA',
      templateUrl: 'pages/engineerListTable.tpl.html',
    };
  });

swof.directive('myScheduletbl', function(){
  return {
    restrict: 'EA',
    templateUrl: 'pages/engineerScheduleTable.tpl.html',
  };
});

swof.directive('mySchedulecdr', function(){
  return {
    restrict: 'EA',
    templateUrl: 'pages/engineerScheduleCalendar.tpl.html',
  };
});

swof.directive('mySchedulegenerate', function(){
  return {
    restrict: 'EA',
    templateUrl: 'pages/engineerScheduleGenerate.tpl.html',
  };
});

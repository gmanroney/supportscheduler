swof.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })

    .when('/engineer', {
        templateUrl: 'pages/engineer.html',
        controller: 'engineerController'
    })

    .when('/engineerSchedule', {
        templateUrl: 'pages/engineerSchedule.html',
        controller: 'engineerScheduleController'
    })
    
    .when('/schedule', {
        templateUrl: 'pages/schedule.html',
        controller: 'scheduleController'
    })

    .when('/status', {
        templateUrl: 'pages/status.html',
        controller: 'helpController'
    })
});

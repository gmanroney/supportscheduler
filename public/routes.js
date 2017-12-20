swof.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })

    .when('/engineer', {
        templateUrl: 'pages/engineers_all.html',
        controller: 'engineerController'
    })

    .when('/engineerScheduleTable', {
        templateUrl: 'pages/engineers_schedule_one.html',
        controller: 'engineerScheduleController'
    })

    .when('/schedule', {
        templateUrl: 'pages/engineers_schedule_all.html',
        controller: 'scheduleController'
    })

    .when('/status', {
        templateUrl: 'pages/status.html',
        controller: 'helpController'
    })
});

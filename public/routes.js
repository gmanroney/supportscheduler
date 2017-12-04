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

    .when('/schedule', {
        templateUrl: 'pages/schedule.html',
        controller: 'scheduleController'
    })

    .when('/help', {
        templateUrl: 'pages/help.html',
        controller: 'helpController'
    })
});

angular

.module('shop',[
  'ngRoute',
  'LocalStorageModule'
])

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/index.ejs',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});


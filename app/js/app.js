angular

.module('shop',[
  'ngRoute',
  'LocalStorageModule'
])

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}]);


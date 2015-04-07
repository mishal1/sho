angular.module('shop').service('Storage', function($http){

  var watchEverything = function($scope, localStorageService){
    var array = ['basket', 'userVoucher'];
    array.forEach(function(element){
      $scope.$watch(element, function(){
        localStorageService.set(element, $scope[element]);
      }, true);
    });
  };

  return {
    watchEverything: watchEverything
  };

});
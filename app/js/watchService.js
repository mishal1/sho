angular.module('shop').service('Main', function($http){

  var watchBasket = function($scope, localStorageService){
    var array = ['basket', 'userVoucher'];
    array.forEach(function(element){
      $scope.$watch(element, function(){
        localStorageService.set(element, $scope[element]);
      }, true);
    });
  };

  var httpPost = function(item, url){
    return $http({ method:'POST', url: url, data: $.param(item),headers: {'Content-Type': 'application/x-www-form-urlencoded'}});    
  };

  return {
    watchBasket: watchBasket,
    httpPost: httpPost
  };

});

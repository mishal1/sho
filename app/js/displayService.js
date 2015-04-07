angular.module('shop').service('Display', function($http){

  var items = function($scope){
    $scope.displayItems = true;
    $scope.displayBasket = false;
  };

  var basket = function($scope){
    $scope.displayItems = false;
    $scope.displayBasket = true;
    checkIfBasketEmpty($scope);
  };

  var checkIfBasketEmpty = function($scope){
    if($scope.basket.length === 0){
      $scope.noProducts = true;
    } else {
      $scope.noProducts = false;
    }
  };

  return {
    items: items,
    basket: basket
  };

});
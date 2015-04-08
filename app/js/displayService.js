angular.module('shop').service('Display', function($http){

  var items = function($scope){
    showSections($scope, true, false);
  };

  var basket = function($scope){
    showSections($scope, false, true);
    checkIfBasketEmpty($scope);
  };

  var checkIfBasketEmpty = function($scope){
    if($scope.basket.length === 0){
      $scope.noProducts = true;
    } else {
      $scope.noProducts = false;
    }
  };

  var showSections = function($scope, items, basket){
    $scope.displayItems = items;
    $scope.displayBasket = basket;
  };

  return {
    items: items,
    basket: basket
  };

});
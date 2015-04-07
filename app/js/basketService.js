angular.module('shop').service('Basket', function($http){

  var add = function(item, $scope){
    $scope.basket.push(item);
    $scope.updatePrice();
    $scope.itemAdded();
  };

  var remove = function(item, $scope){
    $scope.httpPost(item, '/removeitem');
    var index = $scope.basket.indexOf(item);
    $scope.basket.splice(index, 1);
    $scope.showBasket();
  };

  var price = function($scope){
    $scope.totalPrice = 0;
    totalBasketContents($scope);
    applyVoucherDiscount($scope);
  };

  var totalBasketContents = function($scope){
    $scope.basket.forEach(function(item){
      $scope.totalPrice += item.price;
    });
  };

  var applyVoucherDiscount = function($scope){
    if($scope.userVoucher)
      $scope.totalPrice -= $scope.userVoucher.discount;
  };

  return {
    add: add,
    remove: remove,
    price: price
  };

});
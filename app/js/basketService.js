angular.module('shop').service('Basket', function($http){

  var checkInStock = function(item){
    return $http({
      method:'POST',
      url:'/checkstock',
      data: $.param(item),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  };

  var add = function(item, $scope){
    inStock(item, $scope);
  };

  var inStock = function(item, $scope){
    $scope.basket.push(item);
    $scope.updatePrice();
    $scope.itemAdded();
  };

  var remove = function(item, $scope){
    increaseStock(item)
    var index = $scope.basket.indexOf(item);
    $scope.basket.splice(index, 1);
    $scope.showBasket();
  };

  var increaseStock = function(item){
    $http({
      method:'POST',
      url:'/removeitem',
      data: $.param(item),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }

  var price = function($scope){
    var total = 0;
    $scope.basket.forEach(function(item){
      total += item.price;
    });
    $scope.totalPrice = total;
  //   if($scope.userVoucher)
  //     if($scope.checkVoucherIsValid($scope.userVoucher)){
  //       $scope.totalPrice -= $scope.userVoucher.discount;
  //     } else {
  //       $scope.userVoucher = null;
  //     }
  };

  return {
    add: add,
    checkInStock: checkInStock,
    price: price,
    remove: remove
  };

});
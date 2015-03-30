angular.module('shop').service('Basket', function(){

  var add = function(item, $scope){
    if($scope.products[item.name].quantity > 0)
      return inStock(item, $scope);
    $scope.outOfStock();
  };

  var inStock = function(item, $scope){
    $scope.basket.push(item);
    $scope.products[item.name].quantity -= 1;
    $scope.updatePrice();
    $scope.itemAdded();
  };

  var remove = function(item, $scope){
    var index = $scope.basket.indexOf(item);
    $scope.basket.splice(index, 1);
    $scope.products[item.name].quantity += 1;
    $scope.showBasket();
  };

  var show = function($scope){
    $scope.displayItems = false;
    $scope.displayBasket = true;
    $scope.updatePrice();
    if($scope.basket.length === 0){
      $scope.noProducts = true;
    } else {
      $scope.noProducts = false;
    }
  };

  var updatePrice = function($scope){
    var total = 0;
    $scope.basket.forEach(function(item){
      total += item.price;
    });
    $scope.totalPrice = total;
    if($scope.userVoucher)
      if($scope.checkVoucherIsValid($scope.userVoucher)){
        $scope.totalPrice -= $scope.userVoucher.discount;
      } else {
        $scope.userVoucher = null;
      }
  };

  return {
    add: add,
    remove: remove,
    show: show,
    price: updatePrice
  };

});
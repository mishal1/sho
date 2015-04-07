angular.module('shop')

.controller('mainCtrl', function($scope, $http, localStorageService, Products, Basket, Voucher, Message, Display, Storage){

  $scope.setUpStock = function(){
    $scope.show('');
  };

  $scope.show = function(requirement){
    Products.get()
    .success(function(products){
      $scope.products = products;
      $scope.list = Products.show(requirement, $scope);
      Display.items($scope);
    });
  };

  $scope.showBasket = function(){
    $scope.updatePrice();
    Display.basket($scope);
  };

  $scope.addToBasket = function(item){
    Basket.checkInStock(item)
    .success(function(successful){
      if(successful){
        Basket.add(item, $scope);
      } else {
        $scope.outOfStock();
      }
    });
  };
  
  $scope.outOfStock = function(){
    Message.outOfStock($scope);
  };

  $scope.itemAdded = function(){
    Message.itemAdded();
  };
  
  $scope.removeFromBasket = function(item){
    Basket.remove(item, $scope);
  };

  $scope.updatePrice = function(){
    Basket.price($scope);
  };

  $scope.basket = localStorageService.get('basket') || [];

  $scope.setUpStock();

  // $scope.setUpVouchers = function(){
  //   Voucher.get($scope);
  // };

  // $scope.userVoucher = localStorageService.get('userVoucher');
  // $scope.setUpVouchers();
  // Storage.watchEverything($scope, localStorageService);




  // $scope.addVoucher = function(){
  //   Voucher.add($scope);
  // };

  // $scope.checkVoucherIsValid = function(voucher){
  //   return Voucher.checkValid($scope, voucher);
  // };

  // $scope.invalidVoucher = function(){
  //   Message.invalidVoucher($scope);
  // };

});
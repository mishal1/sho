angular.module('shop')

.controller('mainCtrl', function($scope, $http, localStorageService, Products, Basket, Voucher, Message, Display, Main){

  $scope.httpPost = function(item, url){
    return Main.httpPost(item, url)      
  };

  $scope.show = function(requirement){
    Products.show($scope, requirement);
  };

  $scope.displayProducts = function(){
    Display.items($scope);
  };

  $scope.showBasket = function(){
    Basket.show($scope);
    Display.basket($scope);
  };

  $scope.addToBasket = function(item){
    Basket.checkInStock($scope, item);
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

  $scope.checkVoucherValid = function(code){
    Voucher.tryToApply(code, $scope);
  };

  $scope.invalidVoucher = function(){
    Message.invalidVoucher($scope);
  };

  $scope.show('');
  $scope.basket = localStorageService.get('basket') || [];
  $scope.userVoucher = localStorageService.get('userVoucher');
  Main.watchBasket($scope, localStorageService);

});
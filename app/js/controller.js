angular.module('shop')

.controller('mainCtrl', function($scope, $http, localStorageService, Products, Basket, Voucher, Message, Storage){

  $scope.setUpStock = function(){
    Products.get($scope); 
  };

  $scope.setUpVouchers = function(){
    Voucher.get($scope);
  };

  $scope.basket = localStorageService.get('basket') || [];
  $scope.userVoucher = localStorageService.get('userVoucher');
  $scope.setUpStock();
  $scope.setUpVouchers();
  Storage.watchEverything($scope, localStorageService);

  $scope.show = function(requirement){
    $scope.list = Products.show(requirement, $scope);
  };

  // $scope.addToBasket = function(item){
  //   Basket.add(item, $scope);
  // };

  // $scope.removeFromBasket = function(item){
  //   Basket.remove(item, $scope);
  // };

  // $scope.updatePrice = function(){
  //   Basket.price($scope);
  // };

  // $scope.addVoucher = function(){
  //   Voucher.add($scope);
  // };

  // $scope.checkVoucherIsValid = function(voucher){
  //   return Voucher.checkValid($scope, voucher);
  // };

  // $scope.showBasket = function(){
  //   Basket.show($scope);
  // };

  // $scope.outOfStock = function(){
  //   Message.outOfStock($scope);
  // };

  // $scope.invalidVoucher = function(){
  //   Message.invalidVoucher($scope);
  // };

  // $scope.itemAdded = function(){
  //   Message.itemAdded();
  // };

});
angular.module('shop')

.controller('mainCtrl', function($scope, $http, localStorageService, Products, Basket, Voucher, Message, Display, Storage){

  $scope.httpPost = function(item, url){
    return $http({ method:'POST', url: url, data: $.param(item),headers: {'Content-Type': 'application/x-www-form-urlencoded'}});    
  };

  $scope.show = function(requirement){
    $scope.httpPost('', '/getproducts')
    .success(function(products){
      $scope.products = products;
      $scope.list = Products.show(requirement, $scope);
      Display.items($scope);
    });
  };

  $scope.showBasket = function(){
    if($scope.userVoucher)
      $scope.checkVoucherValid({code: $scope.userVoucher.name});
    $scope.updatePrice();
    Display.basket($scope);
  };

  $scope.addToBasket = function(item){
    $scope.httpPost(item, '/checkstock')
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

  $scope.checkVoucherValid = function(code){
    $scope.httpPost(code, '/checkvoucherexists')
    .success(function(voucher){
      if(voucher && Voucher.checkValid($scope, voucher)){
        Voucher.add($scope, voucher);
      } else {
        $scope.invalidVoucher();
        $scope.showBasket();
      }
    });
  };

  $scope.invalidVoucher = function(){
    Message.invalidVoucher($scope);
  };

  $scope.show('');
  $scope.basket = localStorageService.get('basket') || [];
  $scope.userVoucher = localStorageService.get('userVoucher');
  Storage.watchEverything($scope, localStorageService);

});
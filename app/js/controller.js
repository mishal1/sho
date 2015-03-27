angular.module('shop')

.controller('mainCtrl', function($scope, $http, localStorageService){

  $scope.setUpStock = function(){
    $http.get('app/mockDatabase/products.json')
    .success(function(products){
      $scope.products = products;
      $scope.show('', 'all');
    })
    .error(function(error, status, headers, config){
      console.log(error);
    });
  };

  $scope.setUpVouchers = function(){
    $http.get('app/mockDatabase/vouchers.json')
    .success(function(vouchers){
      $scope.vouchers = vouchers;
    })
    .error(function(error, status, headers, config){
      console.log(error);
    }); 
  };

  $scope.show = function(item, all){
    $scope.displayItems = true;
    $scope.displayBasket = false;
    var products = $scope.products;
    $scope.list = [];
    for(var key in products){
      if(products[key].category === item)
        $scope.list.push(products[key]);
      if(all)
       $scope.list.push(products[key]);
    }
  };

  var basketStorage = localStorageService.get('basket');
  var voucher = localStorageService.get('userVoucher');
  var totalPrice = localStorageService.get('totalPrice');

  $scope.$watch('basket', function(){
    localStorageService.set('basket', $scope.basket);
  }, true);

  $scope.$watch('userVoucher', function(){
    localStorageService.set('voucher', $scope.userVoucher);
  }, true);

  $scope.$watch('totalPrice', function(){
    localStorageService.set('totalPrice', $scope.totalPrice);
  }, true);

  $scope.basket = basketStorage || [];
  $scope.userVoucher = voucher;
  $scope.totalPrice = 0;
  $scope.setUpStock();
  $scope.setUpVouchers();
  $scope.totalPrice = totalPrice;

  $scope.addToBasket = function(item){
    if($scope.products[item.name].quantity > 0){
      $scope.basket.push(item);
      $scope.updatePrice();
      $scope.products[item.name].quantity -= 1;
    } else {
      $scope.outOfStock = 'Out of stock :(';
      $scope.invalidVoucher = null;
      $scope.showModal();
    }
  };

  $scope.removeFromBasket = function(item){
    var index = $scope.basket.indexOf(item);
    $scope.basket.splice(index, 1);
    $scope.updatePrice();
    $scope.products[item.name].quantity += 1;
    $scope.showBasket();
  };

  $scope.updatePrice = function(){
    var total = 0;
    $scope.basket.forEach(function(item){
      total += item.price;
    });
    $scope.totalPrice = total;
    if($scope.userVoucher){
      if($scope.checkVoucherIsValid($scope.userVoucher)){
        $scope.totalPrice -= $scope.userVoucher.discount;
      } else {
        $scope.userVoucher = null;
      }
    }
  };

  $scope.addVoucher = function(){
    var voucher = $scope.vouchers[$scope.voucherCode];
    if(voucher && $scope.checkVoucherIsValid(voucher)){
      $scope.userVoucher = voucher;
      $scope.updatePrice();
    } else {
      $scope.invalidVoucher = 'Invalid Voucher :(';
      $scope.outOfStock = null;
      $scope.showModal();
    }
  };

  $scope.checkVoucherIsValid = function(voucher){
    var itemRequirement = false;
    $scope.basket.forEach(function(item){
      if(item.category.indexOf(voucher.itemRequirement) > -1)
        itemRequirement = true;
    });
    if(voucher.itemRequirement === null)
      itemRequirement = true;
    return voucher.totalPriceRequirement <= $scope.totalPrice && itemRequirement;
  };

  $scope.showBasket = function(){
    $scope.displayItems = false;
    $scope.displayBasket = true;
    if($scope.basket.length === 0){
      $scope.noProducts = true;
    } else {
      $scope.noProducts = false;
    }
  };

  $scope.showModal = function(){
    if(document.getElementById('modal'))
      document.getElementById('modal').click();
  };

});
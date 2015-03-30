angular.module('shop')

.controller('mainCtrl', function($scope, $http, localStorageService, Product){

  $scope.setUpStock = function(){
    $http.get('app/mockDatabase/products.json')
    .success(function(products){
      $scope.products = products;
      $scope.show('');
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

  $scope.show = function(item){
    $scope.displayItems = true;
    $scope.displayBasket = false;
    $scope.list = Product.show($scope.products, item);
  };

  var basketStorage = localStorageService.get('basket');
  var voucher = localStorageService.get('userVoucher');
  var totalPrice = localStorageService.get('totalPrice');

  $scope.$watch('basket', function(){
    localStorageService.set('basket', $scope.basket);
  }, true);

  $scope.$watch('userVoucher', function(){
    localStorageService.set('userVoucher', $scope.userVoucher);
  }, true);

  $scope.$watch('totalPrice', function(){
    localStorageService.set('totalPrice', $scope.totalPrice);
  }, true);

  $scope.basket = basketStorage || [];
  $scope.userVoucher = voucher || null;
  $scope.totalPrice = 0;
  $scope.setUpStock();
  $scope.setUpVouchers();
  $scope.totalPrice = totalPrice;

  $scope.addToBasket = function(item){
    if($scope.products[item.name].quantity > 0){
      $scope.basket.push(item);
      $scope.updatePrice();
      $scope.products[item.name].quantity -= 1;
      $scope.itemAdded();
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

  $scope.itemAdded = function(){
    if(document.getElementById('itemAdded')){
      document.getElementById('itemAdded').style.display = 'block';
      setTimeout(function(){
        document.getElementById('itemAdded').style.display = 'none';
      }, 2000);
    }
  };

});
var app = angular.module('shop', []);

app.controller('mainCtrl', function($scope, $http){

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
      $scope.vouchers = vouchers
    })
    .error(function(error, status, headers, config){
      console.log(error);
    }); 
  };

  $scope.show = function(item, all){
    var products = $scope.products;
    $scope.list = [];
    for(var key in products){
      if(products[key].category === item){
        $scope.list.push(products[key]);
      }
      if(all){
       $scope.list.push(products[key]);
      }
    }
  };

  $scope.basket = [];
  $scope.totalPrice = 0;
  $scope.setUpStock();
  $scope.setUpVouchers();

  $scope.addToBasket = function(item){
    if($scope.products[item.name].quantity > 0){
      $scope.basket.push(item);
      $scope.updatePrice()
      $scope.products[item.name].quantity -= 1;
    } else {
      $scope.outOfStock = 'Out of stock :(';
    };
  };

  $scope.removeFromBasket = function(item){
    var index = $scope.basket.indexOf(item)
    $scope.basket.splice(index, 1);
    $scope.updatePrice()
    $scope.products[item.name].quantity += 1;
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
        $scope.userVoucher = null
      }
    }
  }

  $scope.addVoucher = function(){
    var voucher = $scope.vouchers[$scope.voucherCode]
    if(voucher && $scope.checkVoucherIsValid(voucher)){
      $scope.userVoucher = voucher
      $scope.totalPrice -= voucher.discount
    } else {
      $scope.invalidVoucher = 'Invalid Voucher';
    }
  };

  $scope.checkVoucherIsValid = function(voucher){
    var itemRequirement = false
    $scope.basket.forEach(function(item){
      if(item.category.indexOf(voucher.itemRequirement) > -1)
        itemRequirement = true
    });
    return voucher.totalPriceRequirement <= $scope.totalPrice && itemRequirement
  }

});
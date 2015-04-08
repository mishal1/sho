/*jshint expr:true */

angular.module('shop').service('Voucher', function($http){

  var tryToApply = function(code, $scope){
    $scope.httpPost(code, '/checkvoucherexists')
    .success(function(voucher){
      checkValid($scope, voucher) ? add($scope, voucher) : invalidVoucher($scope);
    });
  };

  var add = function($scope, voucher){
      $scope.userVoucher = voucher;
      $scope.updatePrice();
  };

  var invalidVoucher = function($scope){
    $scope.invalidVoucher();
    $scope.showBasket();
  };

  var checkValid = function($scope, voucher){
    return  voucher && checkPriceRequirement($scope, voucher) && checkItemRequirement(false, $scope, voucher);
  };

  var checkPriceRequirement = function($scope, voucher){
    return voucher.totalPriceRequirement <= $scope.totalPrice;
  };

  var checkItemRequirement = function(itemRequirement, $scope, voucher){
    $scope.basket.forEach(function(item){
      if(item.category.indexOf(voucher.itemRequirement) > -1 || voucher.itemRequirement === null)
        itemRequirement = true;
    });
    return itemRequirement;
  };

  return {
    add: add,
    tryToApply: tryToApply
  };

});
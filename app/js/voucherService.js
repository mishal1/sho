angular.module('shop').service('Voucher', function($http){

  var add = function($scope, voucher){
      $scope.userVoucher = voucher;
      $scope.updatePrice();
  };

  var checkValid = function($scope, voucher){
    return  checkPriceRequirement($scope, voucher) && checkItemRequirement(false, $scope, voucher);
  };

  var checkPriceRequirement = function($scope, voucher){
    return voucher.totalPriceRequirement <= $scope.totalPrice
  };

  var checkItemRequirement = function(itemRequirement, $scope, voucher){
    $scope.basket.forEach(function(item){
      if(item.category.indexOf(voucher.itemRequirement) > -1 || voucher.itemRequirement === null)
        itemRequirement = true;
    });
    return itemRequirement;
  }

  return {
    add: add,
    checkValid: checkValid
  };

});
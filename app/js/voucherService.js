angular.module('shop').service('Voucher', function($http){

  var get = function($scope){
    $http.get('app/mockDatabase/vouchers.json')
      .success(function(vouchers){
        $scope.vouchers = vouchers;
      });
  };

  var add = function($scope){
    var voucher = $scope.vouchers[$scope.voucherCode];
    if(voucher && checkValid($scope, voucher)){
      $scope.userVoucher = voucher;
      $scope.updatePrice();
    } else {
      $scope.invalidVoucher();
    }
  };

  var checkValid = function($scope, voucher){
    var itemRequirement = false;
    $scope.basket.forEach(function(item){
      if(item.category.indexOf(voucher.itemRequirement) > -1)
        itemRequirement = true;
      if(voucher.itemRequirement === null)
        itemRequirement = true;
    });
    return voucher.totalPriceRequirement <= $scope.totalPrice && itemRequirement;
  };

  return {
    get: get,
    add: add,
    checkValid: checkValid
  };

});
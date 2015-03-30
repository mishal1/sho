angular.module('shop').service('Message', function($http){

  var outOfStock = function($scope){
    $scope.outOfStock = 'Out of stock :(';
    $scope.invalidVoucher = null;
    showModal();    
  };

  var invalidVoucher = function($scope){
    $scope.invalidVoucher = 'Invalid Voucher :(';
    $scope.outOfStock = null;
    showModal();
  };

  var showModal = function(){
    if(document.getElementById('modal'))
      document.getElementById('modal').click();
  };

  var itemAdded = function(){
    if(document.getElementById('itemAdded')){
      document.getElementById('itemAdded').style.display = 'block';
      setTimeout(function(){
        document.getElementById('itemAdded').style.display = 'none';
      }, 2000);
    }
  };

  return {
    outOfStock: outOfStock,
    invalidVoucher: invalidVoucher,
    showModal: showModal,
    itemAdded: itemAdded
  };

});
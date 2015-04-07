angular.module('shop').service('Message', function($http){

  var outOfStock = function($scope){
    showModal('outOfStock');  
  };

  var invalidVoucher = function($scope){
    $scope.userVoucher = null;
    showModal('invalidVoucher');
  };

  var showModal = function(modal){
    if(document.getElementById(modal))
      document.getElementById(modal).click();
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
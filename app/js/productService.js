angular.module('shop').service('Products', function($http){

  var show = function(requirement, $scope){
    $scope.displayItems = true;
    $scope.displayBasket = false;
    var array = [];
    $scope.products.forEach(function(item){
      if(item.category === requirement)
        array.push(item);
      if(requirement === '')
       array.push(item);      
    });

    // for(var key in $scope.products){
    //   if($scope.products[key].category === requirement)
    //     array.push($scope.products[key]);
    //   if(requirement === '')
    //    array.push($scope.products[key]);
    // }
    return array;
  };

  var get = function($scope){
    $http.post('/getproducts')
      .success(function(products){
      $scope.products = products;
      $scope.show('');
    });
  };

  return {
    show: show,
    get: get
  };

});
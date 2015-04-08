angular.module('shop').service('Products', function($http){

  var show = function($scope, requirement){
    $scope.httpPost('', '/getproducts')
    .success(function(products){
      display($scope, requirement, products);
    });    
  };

  var display = function($scope, requirement, products){
      $scope.products = products;
      $scope.list = list(requirement, $scope);
      $scope.displayProducts();
  };

  var list = function(requirement, $scope){
    var array = [];
    $scope.products.forEach(function(item){
      checkItemCategory(array,item,requirement);
    });
    return array;
  };

  var checkItemCategory = function(array,item,requirement){
    ifFilterItems(array,item,requirement);
    ifShowAllItems(array,item,requirement);
  };

  var get = function($scope){
    return $http.post('/getproducts');
  };

  var ifFilterItems = function(array,item,requirement){
    if(item.category === requirement)
      array.push(item);
  };

  var ifShowAllItems = function(array,item,requirement){
    if(requirement === '')
     array.push(item);
  };

  return {
    show: show,
    get: get
  };

});
angular.module('shop').service('Products', function($http){

  var show = function(requirement, $scope){
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
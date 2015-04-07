angular.module('shop').service('Products', function($http){

  var show = function(requirement, $scope){
    var array = [];
    $scope.products.forEach(function(item){
      checkItemCategory(array,item,requirement);
    });
    return array;
  };

  var checkItemCategory = function(array,item,requirement){
    if(item.category === requirement)
      array.push(item);
    if(requirement === '')
     array.push(item);
  };

  var get = function($scope){
    return $http.post('/getproducts');
  };

  return {
    show: show,
    get: get
  };

});
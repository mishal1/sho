var app = angular.module('shop', []);

app.controller('mainCtrl', function($scope, $http){

  $scope.show('')

  $scope.show = function(item){
    $http.get('app/mockDatabase/products.json')
      .success(function(product){
        $scope.basket = []
        $scope.list = [];
        $scope.totalPrice = null
        $scope.noProducts = false
        for(var key in product){
          if(product[key].category === item){
            $scope.list.push(product[key]);
          }
        }
      })
      .error(function(error, status, headers, config){
        console.log(error);
      });
  };

  $scope.addToBasket = function(product){
    var item = {product: product};
    $http({
      method:'POST',
      url:'http://localhost:3000/addProduct',
      data: $.param(item),
      transformRequest: false,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .error(function(error){
      console.log(error)
    });
  };

  };
});
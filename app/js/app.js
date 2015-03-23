var app = angular.module('shop', []);

app.controller('mainCtrl', function($scope, $http){
  $scope.show = function(item){
    $http.get('mockDatabase/products.json')
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

});
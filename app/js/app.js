var app = angular.module('shop', []);

app.controller('mainCtrl', function($scope, $http){

  $scope.showAll = function(){
    $http.get('app/mockDatabase/products.json')
    .success(function(products){
      $scope.products = products;
      $scope.show('', 'all');
    })
    .error(function(error, status, headers, config){
      console.log(error);
    });
  };

  $scope.show = function(item, all){
    var products = $scope.products;
    $scope.list = [];
    for(var key in products){
      if(products[key].category === item){
        $scope.list.push(products[key]);
      }
      if(all){
       $scope.list.push(products[key]);
      }
    }
  };

  $scope.basket = [];
  $scope.totalPrice = 0;
  $scope.showAll();

  $scope.addToBasket = function(item){
    if($scope.products[item.name].quantity > 0){
      $scope.basket.push(item);
      $scope.totalPrice += item.price;
      $scope.products[item.name].quantity -= 1;
    } else {
      $scope.outOfStock = 'Out of stock :(';
    };
  };

  $scope.removeFromBasket = function(item){
    var index = $scope.basket.indexOf(item)
    $scope.basket.splice(index, 1);
    $scope.totalPrice -= item.price;
    $scope.products[item.name].quantity += 1;
  };

});
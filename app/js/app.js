var app = angular.module('shop', []);

app.controller('mainCtrl', function($scope, $http){

  $scope.show = function(item, all){
    $http.get('app/mockDatabase/products.json')
      .success(function(product){
        $scope.list = [];
        for(var key in product){
          if(product[key].category === item){
            $scope.list.push(product[key]);
          }
          if(all){
           $scope.list.push(product[key]); 
          }
        }
      })
      .error(function(error, status, headers, config){
        console.log(error);
      });
  };

  $scope.show('', true)

});
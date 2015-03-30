angular.module('shop').service('Basket', function(){

  var add = function(item, products, basket){
    basket.push(item);
    products[item.name].quantity -= 1;
  };

  return {
    add: add
  };

});
angular.module('shop').service('Product', function(){

 var show = function(products, item){
  var array = [];
  for(var key in products){
    if(products[key].category === item)
      array.push(products[key]);
    if(item === '')
     array.push(products[key]);
  }
  return array;
 };

 return {
  show: show
 };

});
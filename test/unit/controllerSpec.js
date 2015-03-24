describe('Shopfront Controller', function() {

  beforeEach(module('shop'));

  var scope, ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('mainCtrl', {
      $scope: scope
    });
  }));

  it('is a controller', function(){
    expect(ctrl).toBeDefined();
    expect(scope).toBeDefined();
  });

  it('has an empty basket', function() {
    expect(scope.basket).toBeDefined();
    expect(scope.basket).toEqual([])
  });

  // it('has a total price of 0', function(){});

  // it('a product can be added to the basket', function(){});  

  // it('the total price changes when a product is added to the basket', function(){}); 

  // it('an item must be in stock to be added to the basket', function(){});

  // it('the stock decreases when an item is added to the basket', function(){});

  // it('a product can be removed from the basket', function(){});

  // it('the total price changes when a product is removed from the basket', function(){});

  // it('the stock increases when an item is removed from the basket', function(){});

  // it('a voucher can be added to the total price', function(){});

  // it('a voucher must exist to be added to the total price', function(){});

  // it('a voucher must meet the total price requirements to be added to the total price', function(){});

  // it('a voucher must meet the item requirements to be added to the total price', function(){});        

});
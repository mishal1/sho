describe('Shopfront Controller', function() {

  beforeEach(module('shop'));

  var scope, ctrl, item;

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

  it('has a total price of 0', function(){
    expect(scope.totalPrice).toBeDefined();
    expect(scope.totalPrice).toEqual(0)
  });

  describe('adds product into the basket', function(){

    beforeEach(function(){
      product = {name: "Almond Toe Court Shoes", category: "Womens Footwear", price: 99.00, quantity: 5}
      scope.products = {"Almond Toe Court Shoes": product}
      scope.addToBasket(product)
    })

    it('a product can be added to the basket', function(){
      expect(scope.basket).toEqual([product])
    });    

    it('the total price changes when a product is added to the basket', function(){
      expect(scope.totalPrice).toEqual(product.price)
    });

    it('the stock decreases when an item is added to the basket', function(){
      expect(scope.products["Almond Toe Court Shoes"].quantity).toEqual(4)
    });

  });  


  // it('an item must be in stock to be added to the basket', function(){});


  // it('a product can be removed from the basket', function(){});

  // it('the total price changes when a product is removed from the basket', function(){});

  // it('the stock increases when an item is removed from the basket', function(){});

  // it('a voucher can be added to the total price', function(){});

  // it('a voucher must exist to be added to the total price', function(){});

  // it('a voucher must meet the total price requirements to be added to the total price', function(){});

  // it('a voucher must meet the item requirements to be added to the total price', function(){});        

});
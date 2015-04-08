describe('Basket', function() {

  var scope, ctrl, product, httpBackend;

  beforeEach(module('shop'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    ctrl = $controller('mainCtrl', {
      $scope: scope
    });
    product = {name: "Almond Toe Court Shoes", category: "Womens Footwear", price: 99.00, quantity: 1};
    httpBackend.whenPOST('/getproducts')
      .respond([product]);
    httpBackend.whenPOST('/checkstock')
      .respond(true);
    httpBackend.whenPOST('/removeitem')
    .respond(true);
    scope.basket = [];
  }));

  it('has an empty basket', function() {
    httpBackend.flush();
    expect(scope.basket).toBeDefined();
    expect(scope.basket).toEqual([]);
  });

  describe('when an item is added', function(){

    beforeEach(function(){
      scope.addToBasket(product);
      httpBackend.flush();
    });

    it('the basket contains that product', function(){
      expect(scope.basket).toEqual([product]);
    });    

    it('the total price changes', function(){
      expect(scope.totalPrice).toEqual(99);
    });

  });

  describe('when a product is removed from the basket', function(){

    beforeEach(function(){
      scope.removeFromBasket(product);
    });

    it('a product can be removed from the basket', function(){
      expect(scope.basket).toEqual([]);
    });

    it('the total price changes when a product is removed from the basket', function(){
      expect(scope.totalPrice).toEqual(0);
    });

  }); 

});
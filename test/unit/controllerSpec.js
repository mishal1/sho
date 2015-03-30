describe('Basket', function() {

  var scope, ctrl, product, anotherProduct, httpBackend, voucher;

  beforeEach(module('shop'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('mainCtrl', {
      $scope: scope
    });
    product = {name: "Almond Toe Court Shoes", category: "Womens Footwear", price: 99.00, quantity: 1};
    anotherProduct = {category: "Womens Casualwear",colour: "Medium Red", price: 30.00, quantity: 5, name: "Cotton Shorts"};
    otherProduct = {category: "Womens Casualwear",colour: "Medium Red", price: 75.00, quantity: 5, name: "Cotton Shorts"};
    httpBackend = _$httpBackend_;
    httpBackend.expectGET('app/mockDatabase/products.json')
      .respond({"Almond Toe Court Shoes": product,
                "Cotton Shorts": anotherProduct,
              });
    voucher = {discount: 15.00, totalPriceRequirement: 75.00, itemRequirement: "Footwear"};
    httpBackend.expectGET('app/mockDatabase/vouchers.json')
      .respond({"over75withshoes": voucher});
    httpBackend.flush();
  }));

  it('is a controller', function(){
    expect(ctrl).toBeDefined();
    expect(scope).toBeDefined();
  });

  it('has an empty basket', function() {
    expect(scope.basket).toBeDefined();
    expect(scope.basket).toEqual([]);
  });

  it('has a total price of null when initialised', function(){
    expect(scope.totalPrice).toBeDefined();
    expect(scope.totalPrice).toEqual(null);
  });

  describe('when a product is added to the basket', function(){

    beforeEach(function(){
      scope.addToBasket(product);
    });

    it('the basket contains that product', function(){
      expect(scope.basket).toEqual([product]);
    });    

    it('the total price changes', function(){
      expect(scope.totalPrice).toEqual(99);
    });

    it('the stock decreases', function(){
      expect(scope.products["Almond Toe Court Shoes"].quantity).toEqual(0);
    });

    it('an item must be in stock to be added to the basket', function(){
      scope.addToBasket(product);
      expect(scope.outOfStock).toEqual('Out of stock :(');
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

      it('the stock increases when an item is removed from the basket', function(){
        expect(scope.products["Almond Toe Court Shoes"].quantity).toEqual(1);
      });

    });

    describe('voucher', function(){

      beforeEach(function(){
        scope.voucherCode = "over75withshoes";
      });

      it('can be added', function(){
        scope.addVoucher();
        expect(scope.userVoucher).toEqual(voucher);
        expect(scope.totalPrice).toEqual(84);
      });

      it('must exist to be added to the total price', function(){
        scope.voucherCode = "RANDOM";
        scope.addVoucher();
        expect(scope.invalidVoucher).toEqual('Invalid Voucher :(');
      });

      describe('requirements for vouchers', function(){

        beforeEach(function(){
          scope.removeFromBasket(product);
        });

        it('must meet the total price requirements to be added to the total price', function(){
          scope.addToBasket(anotherProduct);
          scope.addVoucher();
          expect(scope.invalidVoucher).toEqual('Invalid Voucher :(');
        });

        it('must meet the item requirements to be added to the total price', function(){
          scope.addToBasket(otherProduct);
          scope.addVoucher();
          expect(scope.invalidVoucher).toEqual('Invalid Voucher :(');
        });
      
      });

      it('needs to be removed from the basket if it is no longer valid', function(){
        scope.addVoucher();
        scope.removeFromBasket(product);
        scope.addToBasket(otherProduct);
        expect(scope.totalPrice).toEqual(75);
      });

    });

  });  

});
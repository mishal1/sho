describe('Voucher', function() {

  var scope, ctrl, product, anotherProduct, httpBackend, voucher;

  beforeEach(module('shop'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    ctrl = $controller('mainCtrl', {
      $scope: scope
    });
    product = {name: "Almond Toe Court Shoes", category: "Womens Footwear", price: 99.00, quantity: 1};
    anotherProduct = {category: "Womens Casualwear",colour: "Medium Red", price: 30.00, quantity: 5, name: "Cotton Shorts"};
    httpBackend.whenPOST('/getproducts')
      .respond([product, anotherProduct]);
    voucher = {discount: 15.00, totalPriceRequirement: 75.00, itemRequirement: "Footwear", name: "over75withshoes"};
    httpBackend.whenPOST('/checkvoucherexists')
      .respond(voucher);
    httpBackend.whenPOST('/checkstock')
      .respond(true);
    httpBackend.whenPOST('/removeitem')
      .respond(true);
    scope.basket = [];
  }));

  it('cannot add a voucher if the basket does not meet the total price requirements', function(){
    scope.checkVoucherValid("over75withshoes");
    httpBackend.flush();
    expect(scope.userVoucher).toEqual(null);
  });  

  describe('if a voucher is valid', function(){

    beforeEach(function(){
      scope.addToBasket(product);
      scope.addToBasket(anotherProduct);
      scope.checkVoucherValid("over75withshoes");
      httpBackend.flush();
    });

    it('it is added', function(){
      expect(scope.userVoucher).toEqual(voucher);
    });

    it('the basket price changes', function(){
      var newPrice = anotherProduct.price + product.price - voucher.discount;
      expect(scope.totalPrice).toEqual(newPrice);
    });

    it('will remove the voucher if it is no longer valid', function(){
      scope.removeFromBasket(product);
      httpBackend.flush();
      expect(scope.userVoucher).toEqual(null);
    });

    it('will remove the voucher if it does not meet the item requirements', function(){
      scope.removeFromBasket(product);
      httpBackend.flush();
      expect(scope.totalPrice).toEqual(anotherProduct.price);
    });
  });

});
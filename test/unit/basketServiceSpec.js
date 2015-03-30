describe('Basket Service', function(){

  var Basket, products, userBasket;

  beforeEach(module('shop'));

  beforeEach(inject(function(_Basket_){
    Basket = _Basket_;
    item = {"category": "Womens Footwear", "colour": "Blue", "price": 42.00, "quantity": 4, "name": "Suede Shoes", "url": "app/images/women-shoes2.png"};
    products = {"Suede Shoes": item};
    userBasket = [];
  }));

  it('should add an item to the basket', function(){
    Basket.add(item, products, userBasket);
    expect(userBasket).toEqual([item]);
  });

  it('should decrease the quantity of the products', function(){
    expect(products[item.name].quantity).toEqual(4);
    Basket.add(item, products, userBasket);
    expect(products[item.name].quantity).toEqual(3);
  });

});
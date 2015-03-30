describe('Product Service', function(){

  var Product, products, firstProduct, secondProduct;

  beforeEach(module('shop'));

  beforeEach(inject(function(_Product_){
    Product = _Product_;
    firstProduct = {"category": "Womens Footwear", "colour": "Blue", "price": 42.00, "quantity": 4, "name": "Suede Shoes", "url": "app/images/women-shoes2.png"};
    secondProduct = {"category": "Mens Footwear", "colour": "Tan", "price": 34.00, "quantity": 12, "name": "Leather Driver Saddle Loafers", "url": "app/images/mens-shoes1.png"};
    products = {"Suede Shoes": firstProduct, "Leather Driver Saddle Loafers": secondProduct};
  }));

  it('should show all items', function(){
    expect(Product.show(products,'')).toEqual([firstProduct, secondProduct]);
  });

  it('should filter products', function(){
    expect(Product.show(products,'Womens Footwear')).toEqual([firstProduct]);
  });

});
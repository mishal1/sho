describe('Mock Database Methods', function(){

  var mockJSON, mockDB, mockVouchersJSON;

  beforeEach(function(){
    mockProductsJSON =  {"1": {"quantity": 5, "name": "Almond Toe Court Shoes"}, "2": {"quantity": 0, "name": "Suede Shoes"}};
    mockVouchersJSON = {"1": {"name": "under50"}, "2": {"name": "over50"}};
    mockDB = new MockDB(mockProductsJSON, mockVouchersJSON);
  });

  it('should have a database of items', function(){
    expect(mockDB.products).toEqual(mockProductsJSON);
  });

  it('should have a database of vouchers', function(){
    expect(mockDB.vouchers).toEqual(mockVouchersJSON);
  });

  it('should return true if item is in stock', function(){
    expect(mockDB.addProduct("Almond Toe Court Shoes")).toEqual(true);
  });

  it('should not return true if the item is not in stock', function(){
    expect(mockDB.addProduct("Suede Shoes")).toEqual(false);
  });

  it('should decrease stock when an item is added', function(){
    mockDB.addProduct("Almond Toe Court Shoes");
    expect(mockProductsJSON["1"].quantity).toEqual(4);
  });

  it('should increas the stock when an item is removed', function(){
    mockDB.removeProduct("Suede Shoes");
    expect(mockProductsJSON["2"].quantity).toEqual(1);
  });

});
describe('Mock Database Methods', function(){

  var mockJSON, mockDB, mockVouchersJSON;

  beforeEach(function(){
    mockProductsJSON =  [{"quantity": 5, "name": "Almond Toe Court Shoes"}, {"quantity": 0, "name": "Suede Shoes"}];
    mockVouchersJSON = [{"name": "under50"}, {"name": "over50"}];
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
    expect(mockProductsJSON[0].quantity).toEqual(4);
  });

  it('should increase the stock when an item is removed', function(){
    mockDB.removeProduct("Suede Shoes");
    expect(mockProductsJSON[1].quantity).toEqual(1);
  });

  it('should return true if voucher exists', function(){
    expect(mockDB.checkVoucherExists("under50")).toEqual({"name": "under50"});
  });

  it('should return false if a voucher does not exist', function(){
    expect(mockDB.checkVoucherExists("random")).toEqual(null);
  });

});
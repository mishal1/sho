function MockDB(products, vouchers){
  this.products = products;
  this.vouchers = vouchers;
}

MockDB.prototype.addProduct = function(item) {
  this.inStock = false;
  for(var key in this.products)
    this.checkEachItem(item,key);
  return this.inStock;
};

MockDB.prototype.checkItemExists = function(item, key) {
  return this.products[key].name === item;
};

MockDB.prototype.checkItemInStock = function(key) {
  return this.products[key].quantity > 0;
};

MockDB.prototype.checkEachItem = function(item,key) {
  if(this.checkItemExists(item,key) && this.checkItemInStock(key))
    this.itemIsInStock(key); 
};

MockDB.prototype.decreaseStock = function(key) {
  this.products[key].quantity -= 1;
};

MockDB.prototype.itemIsInStock = function(key) {
  this.decreaseStock(key);
  this.inStock = true;
};

MockDB.prototype.removeProduct = function(item) {
  for(var key in this.products)
    if(this.checkItemExists(item,key))
      this.increaseStock(key);
};

MockDB.prototype.increaseStock = function(key) {
  this.products[key].quantity += 1;
};

module.exports = MockDB;

var helper = {
  fillVoucher: function(){
    browser.findElement(by.css('input')).then(function(input){
      input.sendKeys('over75withshoes');  
      var button = browser.findElement(by.id('voucherSubmit'));
      button.click();
    });
  },
  addFirstItem: function(){
    var button = element.all(by.id('productButton')).first();
    button.click();
  },
  addLastItem: function(){
    button = element.all(by.id('productButton')).last();
    button.click();
  },
  deleteItem: function(){
    var deleteButton = element.all(by.id('delete')).first();
    deleteButton.click();
  },
  visitBasket: function(){
    var basketButton = browser.findElement(by.id('basketButton')).then(function(button){
      button.click();
    });
  },
  waitForModal: function(){
    modal = browser.findElement(by.id('myModal'));
    browser.wait(function(){
      return modal.isDisplayed();
    }, 8000);
  },
    deleteAllItems: function(){
    element.all(by.id('basketItem')).then(function(items){
      for(var i = 0; i< items.length; i++){
        browser.get('http://localhost:3000');
        var basketButton = browser.findElement(by.id('basketButton')).then(function(button){
          button.click();
        });
        var deleteButton = element.all(by.id('delete')).first();
        deleteButton.click();
      }
    });     
  }
};

module.exports = helper;
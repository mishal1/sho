describe('products', function() {

  var modal;

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();
  });

  afterEach(function(){
    deleteAllItems();
  });

  var addFirstItem = function(){
    var button = element.all(by.id('productButton')).first();
    button.click();
  };

  var deleteAllItems = function(){
    element.all(by.id('basketItem')).then(function(items){
      for(var i = 0; i< items.length; i++){
        browser.get('http://localhost:3000');
        visitBasket();
        deleteItem();
      }
    });    
  };

  var waitForModal = function(){
    modal = browser.findElement(by.id('myModal'));
    browser.wait(function(){
      return modal.isDisplayed();
    }, 8000);
  };

  var visitBasket = function(){
    var basketButton = browser.findElement(by.id('basketButton')).then(function(button){
      button.click();
    });
  };

  var deleteItem = function(){
    var deleteButton = element.all(by.id('delete')).first();
    deleteButton.click();
  };

  it('should have title', function() {
    expect(browser.getTitle()).toEqual('Shop');
  });

  it('should display the name of the shop', function(){
    var element = browser.findElement(by.id('name')).then(function(element){
      expect(element.getText()).toEqual('Shopfront');
      expect(element.isDisplayed()).toBe(true);
    });
  });

  it('should have a women button', function(){
    var element = browser.findElement(by.id('women-button')).then(function(element){
      expect(element.getText()).toEqual('Women');
      expect(element.isDisplayed()).toBe(true);
    });
  });

  it('should have a men button', function(){
    var element = browser.findElement(by.id('men-button')).then(function(element){
      expect(element.getText()).toEqual('Men');
      expect(element.isDisplayed()).toBe(true);
    });
  });

  it('should click the women button and a category to display items', function(){
    var button = browser.findElement(by.id('women-button')).then(function(button){
      button.click();
      var category_button = browser.findElement(by.id('womenCasualwear'));
      category_button.click().then(function(){
        element.all(by.id('product')).then(function(items) {
          expect(items.length).toBe(2);
          expect(items[0].isDisplayed()).toBe(true);
        });
      });
    });
  });

  it('a modal should not be displayed', function(){
    browser.findElement(by.id('myModal')).then(function(modal){
      expect(modal.isDisplayed()).toBe(false);
    });
  });

  describe('when an item is out of stock', function(){

    beforeEach(function(){
      for(var i= 0; i < 6; i++){
        addFirstItem();
      }
      waitForModal();
    });

    it('a modal is displayed', function(){
      expect(modal.isDisplayed()).toBe(true);
    });

    it('an out of stock message is displayed in the modal', function(){
      expect(modal.getText()).toEqual('Out of stock :(\n×');
    });

  });

});
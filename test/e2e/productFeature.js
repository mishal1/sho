var Helper = require('./helper');

describe('products', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();
  });

  afterEach(function(){
    Helper.deleteAllItems.call();
  });

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

    var modal;

    beforeEach(function(){
      for(var i= 0; i < 6; i++){
        Helper.addFirstItem.call();
      }
      Helper.waitForModal.call();
      modal = modal = browser.findElement(by.id('myModal'));
    });

    it('a modal is displayed', function(){
      expect(modal.isDisplayed()).toBe(true);
    });

    it('an out of stock message is displayed in the modal', function(){
      expect(modal.getText()).toEqual('Out of stock :(\n×');
    });

  });

});
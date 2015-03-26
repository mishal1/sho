describe('homepage', function() {

  var protractor;

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();
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

  it('should have an empty basket', function(){
    var basketButton = browser.findElement(by.id('basketButton')).then(function(button){
      button.click();
      browser.findElement(by.id('basket')).then(function(element){
        expect(element.getText()).toEqual('No items :(');
      });
    });
  });

  describe('when an item is added to the basket', function(){

    beforeEach(function(){
      var button = element.all(by.id('productButton')).first();
      button.click();
      browser.findElement(by.id('basketButton')).then(function(button){
        button.click();
      });
    });

    it('item can be added to the basket', function(){
      element.all(by.id('basketItem')).then(function(items){
        expect(items.length).toBe(1);
        expect(items[0].isDisplayed()).toBe(true);
      });
    });

    // it('should display total', function(){
    //   browser.findElement(by.id(''))
    // });
    
    // it('item is no longer display when an item is removed from the basket', function(){});

    // it('the total price is changed when an item is removed from the basket', function(){});

    // it('an out of stock message is displayed if the item is out of stock', function(){});

    // it('a voucher can be added to the basket', function(){});

    // it('a message is displayed if the voucher is not valid', function(){});

    // it('a voucher will be removed if is no longer valid', function(){});

  });


});




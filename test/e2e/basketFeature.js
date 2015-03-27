describe('basket', function(){

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();
  });

  var deleteItem = function(){
    var deleteButton = element.all(by.id('delete')).first();
    deleteButton.click();
  };

  var addFirstItem = function(){
    var button = element.all(by.id('productButton')).first();
    button.click();
  };

  var visitBasket = function(){
    var basketButton = browser.findElement(by.id('basketButton')).then(function(button){
      button.click();
    });
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

  it('should be empty', function(){
    visitBasket();
    browser.findElement(by.id('basket')).then(function(element){
        expect(element.getText()).toEqual('No items :(');
    });
  });

  describe('adds item to basket', function(){

    beforeEach(function(){
      addFirstItem();
      visitBasket();      
    });

    afterEach(function(){
      deleteAllItems();
    });

    it('item can be added to the basket', function(){
      element.all(by.id('basketItem')).then(function(items){
        expect(items.length).toBe(1);
        expect(items[0].isDisplayed()).toBe(true);
      });
    });

    it('should display total', function(){
      browser.findElement(by.id('totalPrice')).then(function(element){
        expect(element.getText()).toEqual('Total Price: £99');
      });
    });

    describe('when an item is removed from the basket', function(){

      beforeEach(function(){
        deleteItem();
      });

      it('the item should no longer be displayed', function(){
        element.all(by.id('basketItem')).then(function(items){
          expect(items.length).toBe(0);
        });
      });

      it('the total price should update', function(){
        browser.findElement(by.id('basket')).then(function(element){
          expect(element.getText()).toEqual('No items :(');
        });
      });

    });

  });

});
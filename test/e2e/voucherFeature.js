describe('voucher', function(){

  var modal;

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();
    addFirstItem();
    addLastItem();
    visitBasket();
  });

  afterEach(function(){
    deleteAllItems();
  });

  var fillVoucher = function(voucherCode){
    browser.findElement(by.css('input')).then(function(input){
      input.sendKeys(voucherCode);  
      var button = browser.findElement(by.id('voucherSubmit'));
      button.click();
    });
  };

  var deleteItem = function(){
    var deleteButton = element.all(by.id('delete')).first();
    deleteButton.click();
  };

  var addFirstItem = function(){
    var button = element.all(by.id('productButton')).first();
    button.click();
  };

  var waitForModal = function(){
    modal = browser.findElement(by.id('myModal'));
    browser.wait(function(){
      return modal.isDisplayed();
    }, 8000);
  };

  // ADD TO HELPER!!

  var addLastItem = function(){
    button = element.all(by.id('productButton')).last();
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

  it('there should be no vouchers added automatically', function(){
    browser.findElement(by.id('totalPrice')).then(function(element){
      expect(element.getText()).toEqual('Total Price: £639');
    });
  });

  describe('when a voucher is added', function(){

    beforeEach(function(){
      fillVoucher('over75withshoes');
    });

    it('the total price decreases', function(){
      browser.findElement(by.id('totalPrice')).then(function(element){
        expect(element.getText()).toEqual('Total Price: £624');
      });
    });

    it('the voucher will be removed if it is no longer valid', function(){
      deleteItem();
      browser.findElement(by.id('totalPrice')).then(function(element){
        expect(element.getText()).toEqual('Total Price: £540');
      });
    });

    it('a modal should not be displayed', function(){
      browser.findElement(by.id('myModal')).then(function(modal){
        expect(modal.isDisplayed()).toBe(false);
      });
    });

  });

  describe('when an invalid voucher is added', function(){

    beforeEach(function(){
      deleteAllItems();
      browser.get('http://localhost:3000');
      addLastItem();
      visitBasket();
      fillVoucher('over75withshoes');
      waitForModal();
    });

    it('a modal is displayed', function(){
      expect(modal.isDisplayed()).toBe(true);
    });

    it('a message is displayed in the modal', function(){
      expect(modal.getText()).toEqual('Invalid Voucher :(\n×');
    });

  });

});
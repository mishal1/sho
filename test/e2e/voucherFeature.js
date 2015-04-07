var Helper = require('./helper');

describe('voucher', function(){

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();
    Helper.addFirstItem.call();
    Helper.addLastItem.call();
    Helper.visitBasket.call();
  });

  afterEach(function(){
    Helper.deleteAllItems.call();
  });

  it('there should be no vouchers added automatically', function(){
    browser.findElement(by.id('totalPrice')).then(function(element){
      expect(element.getText()).toEqual('Total Price: £639');
    });
  });

  describe('when a voucher is added', function(){

    beforeEach(function(){
      Helper.fillVoucher.call();
    });

    it('the total price decreases', function(){
      browser.findElement(by.id('totalPrice')).then(function(element){
        expect(element.getText()).toEqual('Total Price: £624');
      });
    });

    it('the voucher will be removed if it is no longer valid', function(){
      Helper.deleteItem.call();
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
  
    var modal;

    beforeEach(function(){
      Helper.deleteAllItems.call();
      browser.get('http://localhost:3000');
      Helper.addLastItem.call();
      Helper.visitBasket.call();
      Helper.fillVoucher.call();
      Helper.waitForVoucherModal.call();
      modal = browser.findElement(by.id('myModal'));
    });

    it('a modal is displayed', function(){
      expect(modal.isDisplayed()).toBe(true);
    });

    it('a message is displayed in the modal', function(){
      expect(modal.getText()).toEqual('Invalid voucher! :(\n×');
    });

  });

});
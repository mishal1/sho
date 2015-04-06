// var Helper = require('./helper');

// describe('basket', function(){

//   beforeEach(function() {
//     browser.get('http://localhost:3000');
//     browser.waitForAngular();
//   });

//   it('should be empty', function(){
//     Helper.visitBasket.call();
//     browser.findElement(by.id('basket')).then(function(element){
//         expect(element.getText()).toEqual('No items :(\nContinue Shopping');
//     });
//   });

//   describe('adds item to basket', function(){

//     beforeEach(function(){
//       Helper.addFirstItem.call();
//       Helper.visitBasket.call();      
//     });

//     afterEach(function(){
//       Helper.deleteAllItems.call();
//     });

//     it('item can be added to the basket', function(){
//       element.all(by.id('basketItem')).then(function(items){
//         expect(items.length).toBe(1);
//         expect(items[0].isDisplayed()).toBe(true);
//       });
//     });

//     it('should display total', function(){
//       browser.findElement(by.id('totalPrice')).then(function(element){
//         expect(element.getText()).toEqual('Total Price: £99');
//       });
//     });

//     describe('when an item is removed from the basket', function(){

//       beforeEach(function(){
//         Helper.deleteItem.call();
//       });

//       it('the item should no longer be displayed', function(){
//         element.all(by.id('basketItem')).then(function(items){
//           expect(items.length).toBe(0);
//         });
//       });

//       it('the display message should change', function(){
//         browser.findElement(by.id('basket')).then(function(element){
//           expect(element.getText()).toEqual('No items :(\nContinue Shopping');
//         });
//       });

//     });

//   });

// });
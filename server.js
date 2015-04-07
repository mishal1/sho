var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var products = require('./mockDatabase/products');
var MockDB = require('./lib/dbMethods')

app.use(express.static(__dirname));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/app/views');
app.set('images', __dirname + '/app/images');
app.use(bodyParser.urlencoded({'extended':'true'}));

var mockDB = new MockDB(products)

app.get('/', function(request, response){
  response.render('index');
});

app.post('/getproducts', function(request, response){
  response.send(mockDB.products);
});

app.post('/checkstock', function(request, response){
  var successful = mockDB.addProduct(request.body.name);
  console.log(mockDB.products[0]);
  response.send(successful);
});

app.post('/removeitem', function(request, response){
  mockDB.removeProduct(request.body.name)
  console.log(mockDB.products[0]);
});

// make http request to server to add item
// send wanted item
// if quanitity is greater than 0 => add to basket
// else => show message & decrease quantity
// return true or false maybe?

// make http request to server if item is removed
// send item & increase quantity

// make http request to server if voucher is added
// send voucher code
// if it exists send voucher object with requirements
// controller- check voucher requirements true

// use a filter to show different items

server.listen(3000, function(){
  console.log("Server listening on 3000");
});

module.exports = server;
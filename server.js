var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var products = require('./mockDatabase/products');
var vouchers = require('./mockDatabase/vouchers')
var MockDB = require('./lib/dbMethods')

app.use(express.static(__dirname));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/app/views');
app.set('images', __dirname + '/app/images');
app.use(bodyParser.urlencoded({'extended':'true'}));

var mockDB = new MockDB(products, vouchers)

app.get('/', function(request, response){
  response.render('index');
});

app.post('/getproducts', function(request, response){
  response.send(mockDB.products);
});

app.post('/checkstock', function(request, response){
  var successful = mockDB.addProduct(request.body.name);
  response.send(successful);
});

app.post('/removeitem', function(request, response){
  mockDB.removeProduct(request.body.name);
});

app.post('/checkvoucherexists', function(request, response){
  var voucher = mockDB.checkVoucherExists(request.body.code);
  response.send(voucher);
});

server.listen(3000, function(){
  console.log("Server listening on 3000");
});

module.exports = server;
describe('Products', function() {

  var scope, ctrl, products, httpBackend;

  beforeEach(module('shop'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    ctrl = $controller('mainCtrl', {
      $scope: scope
    });
    products = [{name: "Almond Toe Court Shoes"},{name: "Cotton Shorts"}];
    httpBackend.expectPOST('/getproducts')
      .respond([products]);
  }));

  it('and scope is defined', function(){
    expect(ctrl).toBeDefined();
    expect(scope).toBeDefined();
  });

  it('has array of products', function(){
    httpBackend.flush();
    expect(scope.products).toEqual([products]);
  }); 

});
(function(){
  var app = angular.module("wiki", ['ngCookies','nav-directives']);

	app.controller('LinkController', ['$http', function($http){
		var links = this;
		this.paths = [];

		$http.get('/db/pages').success(function(data, status){
			this.paths = data.pages;
		}).error(function(data, status){
			alert(status, data);
		})
	}]);

  app.controller('BodyController', ['$cookieStore', '$http', function($cookieStore, $http) {
    this.makePost = function () {
      console.log($cookieStore);
    };
  }]);

})();
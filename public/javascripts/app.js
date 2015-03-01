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
    this.page = {};
    this.makePost = function () {
      data = this.page;
      data.user = $cookieStore.get('username');
      // this is probably a stupid way to make the form blank
      $('#new_page').find('.blank').val('');

      $http.post('newPost', data)
        .success(function (data, status) {
          console.log(data);
          console.log('yeeee boiii');
        }).error(function (data, status) {
          alert('There was an error making this post bruh');
        })
      };

      this.loggedIn = function () {
        console.log('logged in?');
        console.log($cookieStore.get('username'));
        return ($cookieStore.get('username'));
      };
    
  }]);

})();
(function(){
  var app = angular.module("wiki", ['ngCookies','nav-directives']);

	app.controller('LinkController', ['$http', '$location', function($http, $location){
		var links = this;
		this.paths = [];

		$http.get('/db/pages').success(function(data, status){
			links.paths = data.pages;
			console.log(links.paths)
		}).error(function(data, status){
			alert(status, data);
		})

		this.goTo = function(path){
			$http.get(path).success(function(data, status){
				$location.path(path)
				var content = data
			}).error(function(data,status){
				alert(status);
			});
		};

		this.checkPage = function(){
			var curPath = $location.path();
			if (curPath.length > 1){
				return false;
			} else {
				return true;
			}
		}
	}]);

  app.controller('BodyController', ['$cookieStore', '$http', function($cookieStore, $http) {
    this.page = {};
    this.makePost = function () {
      data = this.page;
      data.user = $cookieStore.get('username');
      // this is probably a stupid way to make the form blank
      // $('#new_page').find('.blank').val('');
      this.page = {};

      $http.post('newPost', data)
        .success(function (data, status) {
          console.log(data);
          console.log('yeeee boiii');
          // this.page = {};
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
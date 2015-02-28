(function(){
  var app = angular.module("wiki", ['ngCookies']);

	app.controller('HomeController', ['$http', function($http){
		$http.get()
	}]);

	app.controller('NavController',['$cookieStore', '$http','$scope', function($cookieStore, $http, $scope){
		var user = this;
		this.username = '';

		$http.get('/session/username').success(function(data){
			//bake the cookie with username from server to control view.
			if (data !== 'error'){
				console.log(data);
				var username = data.userName;
				$cookieStore.put('username', username);
				user.username = username;
			}
		}).error(function(data){
			alert(data);	
		});


		this.eatCookie = function(){
			//eat the cookie!!(destroys it)
			var username = $cookieStore.get('username');
			$http.post('/session/end').success(function(data, status, headers, config){
				console.log(username);
				$cookieStore.remove('username');
				$scope.check = false;
				user.username = '';
			}).error(function(data,status,headers,config){
				alert("There was an err loggin out")
			})
		}

	}]);

  app.controller('BodyController', ['$cookieStore', '$http', function($cookieStore, $http) {
    this.makePost = function () {
      console.log($cookieStore);
    };
  }]);

})();
(function(){
	var app = angular.module("wiki", ['ngCookies']);

	app.controller('HomeController', ['$http', function($http){
		$http.get()
	}]);

	app.controller('NavController',['$cookieStore', '$http', function($cookieStore, $http){
		this.check = false;

		this.bakeCookie = function(){
			console.log(1 + $cookieStore.get('username'));
			if($cookieStore.get('username') === undefined){
				$http.get('/session/username').success(function(data, status, headers, config){
					if (data){
						var username = data.userName;
						$cookieStore.put('username', username);
						console.log(1 + $cookieStore.get('username'))
						return true;
					}
				}).error(function(data, status, headers, config){
					alert("There was an err handling" + data);
				});
			} else if($cookieStore.get('username')){
				return true;
			} else {
				return false;
			}
		};
			
	}]);
})();
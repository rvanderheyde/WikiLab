(function(){
	var app = angular.module("wiki", ['ngCookies']);

	app.controller('HomeController', ['$http', function($http){
		$http.get()
	}]);

	app.controller('NavController',['$cookieStore', '$http','$scope', function($scope, $cookieStore, $http){
		this.checksum = 0;
		$scope.username = 'test';

		this.bakeCookie = function(){
			if(this.checksum === 0){
				console.log(1 + $cookieStore.get('username'));
				if($cookieStore.get('username') === undefined){
					$http.get('/session/username').success(function(data, status, headers, config){
						if (data !=='No User'){
							var username = data.userName;
							$cookieStore.put('username', username);
							console.log(1 + $cookieStore.get('username'))
							$scope.username = username;
							// this.check = true;
							return true;
						} else {
							return false;
						}
					}).error(function(data, status, headers, config){
						alert("There was an err handling" + data);
					});
				} else if($cookieStore.get('username')){
					// this.check = true;
					return true;
				} else {
					// this.check = false;
					return false;
				}
			} else { console.log('done'); }
		};
		$scope.check = this.bakeCookie();
			
	}]);
})();
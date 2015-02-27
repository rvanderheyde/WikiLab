(function(){
	var app = angular.module("wiki", ['ngCookies']);

	// app.controller('NavController', ['$cookieStore', function($cookieStore){
	// 	this.login = false;
	// 	this.home = true; 

	// 	this.checkLogin = function(){
	// 		console.log(document.cookie);
	// 		return false;
	// 	};

	// 	this.fbLogin = function(){
	// 		console.log('Button Pushed');
			
	// 	};
	// }]);

	app.controller('NavController',['$cookieStore', '$http', function($cookieStore, $http){
		this.check = false;

		this.checkLogin = function(callback){
			if(this.check === false){
				this.check = true;
				console.log('Check Check 66')
				var check = callback();
				console.log(check);
				return check
			} else {
				return false;
			}
		};

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
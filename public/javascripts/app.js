(function(){
	var app = angular.module("wiki", ['ngCookies']);

	app.controller('HomeController', ['$http', function($http){
		$http.get()
	}]);

	app.controller('NavController',['$cookieStore', '$http','$scope', function($cookieStore, $http, $scope){
		var user = this;
		this.username = '';

		$http.get('/session/username').success(function(data){
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
			var username = $cookieStore.get('username');
			$http.post('/session/end').success(function(data, status, headers, config){
				$cookieStore.remove('username');
				$scope.check = false;
			}).error(function(data,status,headers,config){
				alert("There was an err loggin out")
			})
		}
			
	}]);
})();
(function(){
	var app = angular.module('nav-directives', []);

	app.directive('navBar', ['$cookieStore', '$http', function($cookieStore, $http){
		return {
			restrict: 'E',
			templateUrl: '../templates/nav.html',
			controller: function(){
				var user = this;
				this.username = $cookieStore.get('username');

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
						user.username = '';
					}).error(function(data,status,headers,config){
						alert("There was an err loggin out")
					})
				};
			},
			controllerAs:'nav'
		};
	}]);
})();
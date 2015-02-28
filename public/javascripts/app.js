(function(){
  var app = angular.module("wiki", ['ngCookies']);

	app.controller('HomeController', ['$http', function($http){
		$http.get()
	}]);

	app.directive('navBar', ['$cookieStore', '$http', function($cookieStore, $http){
		return {
			restrict: 'E',
			templateUrl: '../templates/nav.html',
			controller: function(){
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
						user.username = '';
					}).error(function(data,status,headers,config){
						alert("There was an err loggin out")
					})
				};
			},
			controllerAs:'nav'
		};
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
				alert("There was an err loggin out");
			})
		}

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
  }]);

})();
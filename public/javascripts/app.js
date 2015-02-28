(function(){
  var app = angular.module("wiki", ['ngCookies']);

	app.controller('HomeController', ['$http', function($http){
		$http.get()
	}]);

	app.controller('NavController',['$cookieStore', '$http','$scope', function($cookieStore, $http, $scope){
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
							console.log(2 + $cookieStore.get('username'))
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
					console.log($cookieStore.get('username'));
					return true;
				} else {
					// this.check = false;
					console.log('WAT!');
					return false;
				}
			} else { console.log('done'); return $scope.check}
		};

		this.eatCookie = function(){
			var username = $cookieStore.get('username');
			$http.post('/session/end').success(function(data, status, headers, config){
				$cookieStore.remove('username');
				$scope.check = false;
			}).error(function(data,status,headers,config){
				alert("There was an err loggin out");
			})
		}
		$scope.check = this.bakeCookie();
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
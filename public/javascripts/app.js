(function(){
	var app = angular.module("wiki", []);

	app.controller('NavController', function(){
		this.login = false;

		this.checkLogin = function(username){
			this.login = true;
		};

		this.fbLogin = function(){
			console.log('Button Pushed');
		};
	});
})();
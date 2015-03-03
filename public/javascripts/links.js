(function(){
	var app = angular.module('links-directive', []);

	app.directive('linkList', ['$http', '$location', function($http, $location){
	    return {
	      restrict: 'E',
	      templateUrl: '../templates/linkList.html',
	      controller: function(){
	        var links = this;
	        this.paths = [];

	        $http.get('/db/pages').success(function(data, status){
	          links.paths = data.pages;
	        }).error(function(data, status){
	          alert(status, data);
	        })

	        this.checkPage = function(){
	          var curPath = $location.path();
	          if (curPath.length < 2){
	            return true;
	          } else if (curPath === '/_=_') {
	            return true;
	          } else {
	            return false;
	          }
	        }
	      },
	      controllerAs: 'linkCtrl'
	    };
	  }]);

})();
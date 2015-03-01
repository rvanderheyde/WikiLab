(function(){
  var app = angular.module("wiki", ['ngRoute', 'ngCookies', 'nav-directives']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/pages/:pagename', {
      templateUrl: '../templates/page.html',
      controller: 'PageController',
      controllerAs: 'page'
    }).when('/pages/:pagename/edit',{
      templateUrl: '../templates/edit.html',
      controller: 'EditController',
      controllerAs: 'edit'
    });

  }]);
  
  app.directive('linkList', ['$http', '$location', function($http, $location){
    return {
      restrict: 'E',
      templateUrl: 'linkList.html',
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
            return false
          }
        }
      },
      controllerAs: 
    };
  }]);

  app.controller('LinkController', ['$http', '$location', function($http, $location){
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
        return false
      }
    }
  }]);

  app.controller('BodyController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location) {
    this.page = {};
    this.makePost = function () {
      data = this.page;
      data.user = $cookieStore.get('username');
      // this is probably a stupid way to make the form blank
      // $('#new_page').find('.blank').val('');
      this.page = {};

      $http.post('newPost', data)
        .success(function (data, status) {
          console.log(data);
          console.log('yeeee boiii');
          // this.page = {};
        }).error(function (data, status) {
          alert('There was an error making this post bruh');
        })
      };

      this.loggedIn = function () {
        console.log('logged in?');
        console.log($cookieStore.get('username'));
        return ($cookieStore.get('username'));
      };

      this.checkPage = function(){
        var curPath = $location.path();
        if (curPath.length < 2){
          return true;
        } else if (curPath === '/_=_') {
          return true;
        } else {
          return false
        }
      }
  }]);
  
  app.controller('EditController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location){

  }]);

  app.controller('PageController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location){

  }]);

})();
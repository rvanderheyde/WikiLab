(function(){
  var app = angular.module("wiki", ['ngRoute', 'ngCookies', 'nav-directives']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/pages/:pagename', {
      templateUrl: '../templates/page.html',
      controller: 'PageController',
      controllerAs: 'page'
    }).when('/pages/:pagename/edit', {
      templateUrl: '../templates/edit.html',
      controller: 'EditController',
      controllerAs: 'edit'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
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
      controllerAs: 'linkCtrl'
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
    var page = this;
    var path = $location.path();
    console.log(path);
    console.log($cookieStore.get('username'));

    $http.get(path)
      .success(function (data, status) {
        page.data = data;
      }).error(function (data, status) {
        alert(status + 'bruh you fucked this page up' + data);
      });

    var username = $cookieStore.get('username');
    if (username) {
      $http.get()
    }

    this.vote = function(up) {
      var data = {};
      // sketchily getting /pages/ out of path
      data.page = $location.path().substring(7);
      data.vote = up;
      // temp fix while login is broken
      data.username = 'Rahil Dedhia';
      $http.post('/vote', data)
        .success(function (data, status) {
          page.data = data;
        }).error(function (data, status) {
          alert('shit is fucked, stop voting');
        });
    };

  }]);

})();

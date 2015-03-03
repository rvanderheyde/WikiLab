(function(){
  var app = angular.module("wiki", ['ngRoute', 'ngCookies', 'nav-directives', 'links-directive']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/pages/:pagename', {
      templateUrl: '../templates/page.html',
      controller: 'PageController',
      controllerAs: 'page'
    }).when('/pages/:pagename/edit', {
      templateUrl: '../../templates/edit.html',
      controller: 'EditController',
      controllerAs: 'edit'
    }).otherwise({redirectTo: '/'});


    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);  
  
  app.controller('EditController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location){
    var stuff = this;
    stuff.page = {};
  
    console.log('This works?')
    var path = $location.path();

    $http.get(path).success(function(data, status){
      stuff.page = data;
      console.log('Yes, yes it does');
      console.log(stuff);
    }).error(function(data, status){ console.log(status); });

    this.editPage = function(){
      console.log(stuff.page)
      var data = stuff.page
      stuff.page = {}
      $http.post('/editPost', data).success(function(data, status){
        $location.path('/pages/' + data.url)
      }).error(function(data, status){ alert(status) })
    }
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

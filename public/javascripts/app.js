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
    // page.upvoted = false;
    // page.downvoted = false;
    var path = $location.path();
    // sketchily getting /pages/ out of path
    var url = $location.path().substring(7);
    console.log(path);

    $http.get(path)
      .success(function (data, status) {
        console.log($cookieStore.get('username'));
        // console.log($cookieStore.get('upvotes'));
        // console.log($cookieStore.get('downvotes'));
        page.data = data;

      }).error(function (data, status) {
        alert(status + 'bruh you fucked this page up' + data);
      });

    var username = $cookieStore.get('username');
    if (username) {
      var user_req = '/user/' + username;
      $http.get(user_req)
        .success(function (data, status) {
          page.upvoted = (data.upvotes.indexOf(url) > -1);
          page.downvoted = (data.downvotes.indexOf(url) > -1);
        }).error(function (data, status) {
          alert('Yea cant retrieve user info for vote button');
        });
    }

    this.vote = function(up) {
      var data = {};
      data.page = url;
      data.vote = up;
      data.username = username;
      $http.post('/vote', data)
        .success(function (data, status) {
          page.data = data;
          if (up) {
            page.upvoted = !page.upvoted;
            page.downvoted = false;
          } else {
            page.downvoted = !page.downvoted;
            page.upvoted = false;
          }
          // page.upvoted = (data.upvotes.indexOf(url) > -1);
          // page.downvoted = (data.downvotes.indexOf(url) > -1);
        }).error(function (data, status) {
          alert('shit is fucked, stop voting');
        });
    };

    this.loggedIn = function () {
      return ($cookieStore.get('username'));
    };

  }]);

})();

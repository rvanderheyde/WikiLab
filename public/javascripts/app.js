(function(){
  var app = angular.module("wiki", ['ngRoute', 'ngCookies', 'nav-directives', 'links-directive']);
  //Router to handle the views
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

    //so weird hashes aren't in the urls
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);  
  //Controller for the edit page
  app.controller('EditController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location){
    var stuff = this;
    stuff.page = {};
    var path = $location.path();
    //get the data to populate the page
    $http.get(path).success(function(data, status){
      stuff.page = data;
    }).error(function(data, status){ console.log(status); });

    this.editPage = function(){
      //handles the edit post request
      var data = stuff.page
      //resets the form
      stuff.page = {}
      $http.post('/editPost', data).success(function(data, status){
        $location.path('/pages/' + data.url)
      }).error(function(data, status){ alert(status) })
    }
  }]);
  //controller for the pages
  app.controller('PageController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location){
    var page = this;
    var path = $location.path();
    // sketchily getting /pages/ out of path
    var url = $location.path().substring(7);
    //populate the page with data
    $http.get(path)
      .success(function (data, status) {
        page.data = data;
      }).error(function (data, status) {
        alert(status + 'bruh you fucked this page up' + data);
      });
    //check if user is logged in to display buttons
    var username = $cookieStore.get('username');
    if (username) {
      var user_req = '/user/' + username;
      //check if user has voted on page already
      $http.get(user_req)
        .success(function (data, status) {
          page.upvoted = (data.upvotes.indexOf(url) > -1);
          page.downvoted = (data.downvotes.indexOf(url) > -1);
        }).error(function (data, status) {
          alert('Yea cant retrieve user info for vote button');
        });
    }

    this.vote = function(up) {
      //handles vote button click
      var data = {};
      data.page = url;
      data.vote = up;
      data.username = username;
      //posts vote to server
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
        }).error(function (data, status) {
          alert('shit is fucked, stop voting');
        });
    };

    this.loggedIn = function () {
      return ($cookieStore.get('username'));
    };

  }]);

})();

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

  

  app.controller('BodyController', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location) {
    this.page = {};
    this.submit=false;
    this.makePost = function () {
      data = this.page;
      data.user = $cookieStore.get('username');
      // this is probably a stupid way to make the form blank
      // $('#new_page').find('.blank').val('');
      this.page = {};
      this.submit=true;
      $http.post('newPost', data)
        .success(function (data, status) {
          console.log(data);
          console.log('yeeee boiii');
        }).error(function (data, status) {
          alert('There was an error making this post bruh');
        })
      };

      this.loggedIn = function () {
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

    $http.get(path)
      .success(function (data, status) {
        page.data = data;
      }).error(function (data, status) {
        alert(status + 'bruh you fucked this page up' + data);
      });

    this.vote = function(up) {
      var data = {};
      data.page = $location.path();
      data.vote = up;
      console.log(data);
    }


  }]);

})();
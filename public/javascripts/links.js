(function(){
  var app = angular.module('links-directive', ['ngCookies']);
  //the link-list directive, handles the main page view, has a list of pages and a form to create a new one.
  app.directive('linkList', ['$cookieStore','$http', '$location', function($cookieStore,$http, $location){
    return {
      restrict: 'E',
      templateUrl: '../templates/linkList.html',
      controller: function(){
        var links = this;
        this.paths = [];
        //get the pages from the database
        $http.get('/db/pages').success(function(data, status){
          links.paths = data.pages;
        }).error(function(data, status){
          alert(status, data);
        })
        
        this.page = {};
        this.makePost = function () {
          //Posts the new page to the server
          data = this.page;
          data.user = $cookieStore.get('username');
          this.page = {};
          this.submit=true;
          $http.post('newPost', data)
            .success(function (data, status) {
              links.paths.push(data)
            }).error(function (data, status) {
              alert('There was an error making this post bruh');
            })
        };

        this.loggedIn = function () {
          //render a different view based on login, if logged in can see the form.
          return ($cookieStore.get('username'));
        };
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
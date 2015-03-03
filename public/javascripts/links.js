(function(){
  var app = angular.module('links-directive', ['ngCookies']);

  app.directive('linkList', ['$cookieStore','$http', '$location', function($cookieStore,$http, $location){
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
        
        this.page = {};
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
              links.paths.push(data)
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
                return false;
              }
            }
          },
          controllerAs: 'linkCtrl'
        };
      }]);
})();
(function(){
  var app = angular.module('edit-directives', ['ngCookies']);

  app.directive('EditDir', ['$cookieStore', '$http', '$location', function($cookieStore, $http, $location){
    return {
      restrict: 'E',
      templateUrl: '../templates/page.html',
      controller: function() {
        var stuff = this;
        stuff.page = {};
      
        console.log('This works?')
        var path = $location.path();

        $http.get(path).success(function(data, status){
          stuff.page = data;
          console.log('Yes, yes it does');
          console.log(stuff);
        }).error(function(data, status){ console.log(status); });

        this.editPage = function() {
          console.log(stuff.page)
          var data = stuff.page
          stuff.page = {}
          $http.post('/editPost', data).success(function(data, status){
            $location.path('/pages/' + data.url)
          }).error(function(data, status){ alert(status)});
        }
      },
      controllerAs: 'edit'
    };
  }]);
})();
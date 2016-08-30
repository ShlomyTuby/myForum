
angular.module('ngForum').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
     // $locationProvider.hashPrefix('#');

      $routeProvider.
        when('/posts', {
          template: '<post-list></post-list>'
        }).
        when('/post/new', {
          template: '<new-post></new-post>'
        }).
        otherwise('/posts');
    }
  ]);

angular.module('myForum').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
     // $locationProvider.hashPrefix('#');

      $routeProvider.
        when('/posts', {
          templateUrl: 'route/post-list.route.template.html'
        }).
        when('/post/new', {
          templateUrl: 'route/new-post.route.template.html'
        }).
        otherwise('/posts');
    }
  ]);
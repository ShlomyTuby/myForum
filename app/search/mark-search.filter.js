angular.module('myForum')
.filter('markSearch', function() {

    return function(text,searchText) {
        /**
         * I try to use custom fiter to mark search term, but its faild to use 'ng-bind-html'
         *  to replace innerHtml
         */
        return text;
    };
});
/** 
 * 
 *  NewPostController
 * 
 */
angular.module('myForum')
    .component('search',{
        templateUrl: 'search/search.template.html',
        controller: SearchController,
        controllerAs: 'searchCtrl'
    });

SearchController.$inject = ['$scope','$rootScope'];

function SearchController($scope,$rootScope){
    
    var that = this;

    that.searchText = '';

    that.search = search;
    that.$onInit = constructor;

    return that;

    function constructor (){

    }

    function search() {
        $rootScope.$broadcast('searchTextChange',that.searchText);
    }

};
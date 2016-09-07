

angular.module('myForum')
    .component('postList',{
        templateUrl: 'post/post-list.template.html',
        controller: PostListController,
        controllerAs: 'listCtrl'
    });

PostListController.$inject = ['$scope','PostService'];

function PostListController($scope,PostService){
    
    var that = this
    that._onPostChange = _onPostChange;
    
    function constructor(){
        that.showChildrens = false;
        that.posts = PostService.getAllRootPosts();
    }

    /**
     * 
     * onPostChange
     */
    function _onPostChange(post) {
        that.posts = PostService.getAllRootPosts();
    }

    constructor();

    return that;
};


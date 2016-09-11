

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
    that.posts = [];
    
    function constructor(){
        that.showChildrens = false;
        PostService.getAllRootPosts()
            .then(function(posts){
                that.posts = posts;
                console.log(posts);
            });
    }

    /**
     * 
     * onPostChange
     */
    function _onPostChange(post) {
        PostService.getAllRootPosts()
            .then(function(posts){
                that.posts = posts;
            });;
    }

    constructor();

    return that;
};


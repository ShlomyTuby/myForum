

angular.module('myForum')
    .component('postList',{
        templateUrl: 'post/post-list.template.html',
        controller: PostListController,
        controllerAs: 'listCtrl'
    });

PostListController.$inject = ['$scope','PostService'];

function PostListController($scope,PostService){
    
    var that = this
    that.deletePost = deletePost;
    that.onAddNewReplay = onAddNewReplay;

    function constructor(){
        that.header = 'Posts List';
        that.posts = PostService.getAllPosts();
    }

    function deletePost(post){
        post.disableDeletedBotton = true;
        PostService.deletePost(post)
            .then(function(){
                that.posts = PostService.getAllPosts();
            });
    }

    function onAddNewReplay(){
         that.posts = PostService.getAllPosts();
    }

    constructor();
};



angular.module('ngForum')
.factory('PostService',[function PostService(){

    that = this;

    this.posts = [
        {
            _id: 1,
            header: 'my first post',
            text: 'this is my first posts',
            author: 'shalom tuby' 
        },
        {
            _id: 2,
            header: 'my second post',
            text: 'this is my second posts',
            author: 'shalom tuby' 
        }

    ];

    that.getAllPosts = function(){
        return this.posts;
    }

    return that;

}]);
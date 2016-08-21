
angular.module('ngForum')
.factory('PostService',PostService);

function PostService($q){

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

    that.addNewPost = function(post){
        var posts = this.posts;
        var deferred = $q.defer();
            setTimeout(function() {
                if(!posts){
                    posts = [];
                };
                posts.push(
                    {
                        _id: posts.length,
                        header: post.header,
                        text: post.text,
                        author: post.author
                    }
                );
                deferred.resolve(
                    posts[posts.length - 1]
                );
            }, 1000);
        return deferred.promise;
    }

    return that;

};


PostService.$inject = ['$q'];
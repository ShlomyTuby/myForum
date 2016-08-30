
angular.module('ngForum')
.factory('PostService',PostService);

function PostService($localStorage,$q){

    that = this;

    posts = [];

    
    saveData = function(){
        $localStorage.posts = posts || [];
    }

    initData = function(){
        posts = $localStorage.posts || [];
    }
    initData();


    that.getAllPosts = function(){
        return posts;
    }

    that.deletePost = function(post){
        var deferred = $q.defer();
            setTimeout(function() {
                posts = posts.filter(function(p){
                    return p._id !== post._id;
                });
                saveData();
                deferred.resolve(
                    posts[posts.length - 1]
                );
            }, 1000);
        return deferred.promise;
    }

    that.addNewPost = function(post){
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
                saveData();
                deferred.resolve(
                    posts[posts.length - 1]
                );
            }, 1000);
        return deferred.promise;
    }


    return that;

};

PostService.$inject = ['$localStorage','$q'];

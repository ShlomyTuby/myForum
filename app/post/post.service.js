
/**
 *
 * Post Service
 * 
 *   */
angular.module('myForum')
    .service('PostService',PostService);

PostService.$inject = ['$localStorage','$q','$http'];

function PostService($localStorage,$q,$http){

    var that = this;

    that.getAllPosts = getAllPosts;
    that.getAllRootPosts = getAllRootPosts;
    that.deletePost = deletePost;
    that.savePost = savePost;
    that.getPostChildren = getPostChildren;
    

    return that;

    function getAllPosts() {
        return $http.get('/api/posts');
    };

    function getAllRootPosts() {
        var defferd =  $q.defer();
        getAllPosts()
            .success(function(posts){
                defferd.resolve(
                    posts.filter(function(p){
                        return p.parentPostId == null;
                    })    
                );
            });
        return defferd.promise;
    };

    function getPostChildren(post) {
        if(post){
            var defferd =  $q.defer();
            getAllPosts()
                .success(function(posts){
                    defferd.resolve(
                        posts.filter(function(p){
                            return post._id != null && p.parentPostId == post._id;
                        })    
                    );
                });
            return defferd.promise;
        };
    };

    function deletePost(post) {
        return $http.delete('/api/posts/'+post._id);
    };

    function savePost(post) {
        if(post._id){
            return $http.put('/api/posts/'+post._id,post);
        } else {
            return $http.post('/api/posts/',post);
        }
    };

};
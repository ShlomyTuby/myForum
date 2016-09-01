
/**
 *
 * Post Service
 * 
 *   */
angular.module('myForum')
    .service('PostService',PostService);

PostService.$inject = ['$localStorage','$q'];

function PostService($localStorage,$q){

    var that = this;

    that.getAllPosts = getAllPosts;
    that.deletePost = deletePost;
    that.addNewPost = addNewPost;

    posts = [];
    function constructor() {
        initData();
    }

    function saveData() {
        $localStorage.posts = posts || [];
    };

    function initData() {
        posts = $localStorage.posts || [];
    };

    function getAllPosts() {
        initData();
        return posts.filter(function(post){
            return !post.parentPostId;
        });;
    };

    function deletePost(post) {
        var deferred = $q.defer();
                posts = posts.filter(function(p){
                    return p._id !== post._id;
                });
                saveData();
                deferred.resolve(
                    { status: 'deleted success' }
                );
        return deferred.promise;
    };

    function addNewPost(post) {
        var deferred = $q.defer();
                if(!posts){
                    posts = [];
                };
                posts.push(
                    new Post(post)
                );
                saveData();
                deferred.resolve(
                    { status: 'add success' ,  post: posts[posts.length - 1] }
                );
        return deferred.promise;
    };

    constructor();
};
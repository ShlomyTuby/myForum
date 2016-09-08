/** 
 * 
 *  NewPostController
 * 
 */
angular.module('myForum')
    .component('newPost',{
        templateUrl: 'post/new-post.template.html',
        controller: NewPostController,
        controllerAs: 'newPostCtrl'
    });

NewPostController.$inject = ['$scope','PostService','$location','AppPropertiesService'];

function NewPostController($scope,postService,$location,AppPropertiesService){
    
    var that = this;

    that.addNewPost = addNewPost;

    function constructor (){
        /**
         * initial data
         */
        that.header = 'New Post';
        $scope.newPost = new Post();
        /**
         *  get current global app Prop 'name' field' 
         */
        AppPropertiesService.getProperty('userName')
            .then(function(userName){
                $scope.newPost.author = userName;            
            });
        /**
         *  register For App Prop 'name' field Change
         */
        AppPropertiesService.registerForChange('userName',function(newVal,oldVal){
            $scope.newPost.author = newVal;
            !$scope.$$phase || $scope.$digest();  
        });

    }
    /**
     * add new post 
     * and redirectTo post-list view
     */
    function addNewPost() {
        postService.savePost(
            $scope.newPost
        ).then(function(){
            $location.path('/posts').replace();
        });
        $scope.newPost = new Post();
    }

    constructor();
};
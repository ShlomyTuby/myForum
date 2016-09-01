/** 
 * 
 *  NewPostReplayController
 * 
 */
angular.module('myForum')
    .component('newPostReplay',{
        templateUrl: 'post/new-post-replay.template.html',
        controller: NewPostReplayController,
        controllerAs: 'newPostCtrl',
        require: '^postList',
        bindings: {
            parentPost: '<',
            onAddNewReplay: "&"
        }
    });

NewPostReplayController.$inject = ['$scope','PostService','AppPropertiesService'];

function NewPostReplayController($scope,postService,AppPropertiesService){
    
    var that = this;

    that.addNewPost = addNewPost;

    function constructor (){
        /**
         * initial data
         */
        that.header = 'New Post';
        that.parentPost = this.parentPost;
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
     */
    function addNewPost() {
        postService.addNewPost(
            $scope.newPost
        ).then(function(){
            $scope.newPost = new Post();
             that.onAddNewReplay();
        });
       
    }


    //this.$onInit()
    constructor();
};
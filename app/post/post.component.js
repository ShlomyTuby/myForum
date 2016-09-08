/** 
 * 
 *  Post Component
 * 
 */
angular.module('myForum')
    .component('post',{
        templateUrl: 'post/post.template.html',
        controller: PostController,
        bindings: {
            post: '<',
            parentPost: '<',
            onPostChange: '&',
            isRootPost: '<',
        }
    });

PostController.$inject = ['$scope','PostService','AppPropertiesService'];

function PostController($scope,PostService,AppPropertiesService){

    var that = this;

    that.savePost = savePost;
    that.deletePost = deletePost;
    that._onPostChange = _onPostChange;

    function constructor (){
         
        that.$onInit = function(){
            
             /**
             * initial data
             */
            if( !that.post ) { // is new post
                
                that.isNewPost = true;

                that.post = new Post({
                    'parentPostId': (that.parentPost ? that.parentPost._id : null)
                });
                
                /**
                 *  get current global app Prop 'name' field' 
                 */
                AppPropertiesService.getProperty('userName')
                    .then(function(userName){
                        that.post.author = userName;            
                    });
                /**
                 *  register For App Prop 'name' field Change
                 */
                AppPropertiesService.registerForChange('userName',function(newVal,oldVal){
                    that.post.author = newVal;
                    !$scope.$$phase || $scope.$digest();  
                });

            } else {

                //get children posts
                that.posts = PostService.getPostChildren(that.post);

            }
            
        };
        

    };

    /**
     * add new post 
     */
    function savePost(post) {
        PostService.savePost(
            post
        ).then(function(res){
            //console.log('post save succesfuly ',res);
            if(that.isNewPost){
               that.post = null; 
            }
            that.$onInit();
            that.onPostChange(that.post);
            that.posts = PostService.getPostChildren(that.post);
        });
    };

    /**
     * delete post 
     */
    function deletePost(post) {
        PostService.deletePost(
            post
        ).then(function(res){
            //console.log('post deleted succesfuly ',res);
            that.onPostChange(that.post);
        });
    };

    /**
     * 
     * onPostChange
     */
    function _onPostChange(post) {
        //console.log('onPostChange',post);
        that.posts = PostService.getPostChildren(that.post);
    }

    //this.$onInit()
    constructor();

    return that;
};
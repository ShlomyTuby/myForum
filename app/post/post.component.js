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
            intialmode: '=mode',            
        }
    });

PostController.$inject = ['$scope','PostService','AppPropertiesService'];

function PostController($scope,PostService,AppPropertiesService){

    var that = this;

    that.savePost = savePost;
    that.deletePost = deletePost;
    that._onPostChange = _onPostChange;
    that.posts = null;
    that.toggelMode = toggelMode;
    that.$onInit = constructor;

    return that;

    function constructor (){
            
             /**
             * initial data
             */
            if( !that.post ) { // is new post
                
                that.isNewPost = true;

                that.post = {
                    'parentPostId': (that.parentPost ? that.parentPost._id : null)
                };
                
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
                that.replayCount = that.post.replayCount
            }
            
            that.toggelMode(that.intialmode);

            $scope.$watch('mode.showDetails',function(newVal,oldVal){
                if(newVal){
                    getChildrens();
                }
            });

    };

    function getChildrens() {
        //get children posts
        PostService.getPostChildren(that.post)
            .then(function(res){
                that.posts = res.data;
                that.replayCount = that.posts.length;
            });

    }

    function toggelMode(modeName){
        
        if( !$scope.mode ){
            $scope.mode = {
                showDetails: false,
                showReplay: false,
            };
        }
        if(!modeName) return;

        switch (modeName) {
            case 'Details':
                $scope.mode.showDetails = !$scope.mode.showDetails;
                break;
            case 'Replay':
                $scope.mode.showReplay = !$scope.mode.showReplay;
                break;
            default:
                break;
        }

    }


    /**
     * add new post 
     */
    function savePost(post) {
        if(!post.parentPostId){
            post.header = post.text;
            post.text = null;
        }
        PostService.savePost(
            post
        ).then(function(res){
            //console.log('post save succesfuly ',res);
            if(that.isNewPost){
               that.post = null; 
            }
            that.$onInit();
            that.onPostChange(that.post);
            getChildrens();
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
            getChildrens();
        });
    };

    /**
     * 
     * onPostChange
     */
    function _onPostChange(post) {
        //console.log('onPostChange',post);
        getChildrens();
    }

};


angular.module('myForum')
    .component('postList',{
        templateUrl: 'post/post-list.template.html',
        controller: PostListController,
        controllerAs: 'listCtrl'
    });

PostListController.$inject = ['$scope','PostService'];

function PostListController($scope,PostService){
    
    var that = this
    that._onPostChange = _onPostChange;
    that.posts = [];
    that.searchText = '';
    that.$onInit = constructor;

    return that;
    

    function getRootPosts() {
        PostService.getAllRootPosts()
            .then(function(res){
                that.posts = res.data;
            });
    };

    function constructor(){
        that.showChildrens = false;
        getRootPosts();

        $scope.$on('searchTextChange',function(event,searchText){
            that.searchText = searchText;
        });
    };

    /**
     * 
     * onPostChange
     */
    function _onPostChange(post) {
        getRootPosts();
    };
    
};


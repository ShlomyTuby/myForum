

angular.module('ngForum')
.component('newPost',{
    templateUrl: 'post/new-post.template.html',
    controller: newPostController
});


function newPostController($scope,postService){
    $scope.header = 'new Post';  
    $scope.newPost = {
        header: '',
        text: '',
        author: ''
    }

    $scope.addNewPost = function(){
        postService.addNewPost(
            $scope.newPost
        ).then(function(){
            $scope.newPost = {
                        header: '',
                        text: '',
                        author: ''
                    }            
        });

    }
}

newPostController.$inject = ['$scope','PostService'];
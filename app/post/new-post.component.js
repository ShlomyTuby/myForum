

angular.module('ngForum')
.component('newPost',{
    templateUrl: 'post/new-post.template.html',
    controller: newPostController,
    resloved: function(){
        console.log('reslove');
    }
});


function newPostController($scope,postService,$timeout,$location,appProperties){
    $scope.header = 'New Post';  
    $scope.status = '';
    $scope.newPost = {
        header: '',
        text: '',
        author: '',
    }

    appProperties.getProperty('userName')
        .then(function(userName){
            $scope.newPost.author = userName;            
        })

    $scope.addNewPost = function(){
        $scope.status = 'load';
        postService.addNewPost(
            $scope.newPost
        ).then(function(){
            $scope.status = 'finish';
            $timeout(function(){$scope.status = '';},1000)
            $location.path('/posts').replace();
        });
        $scope.newPost = {
                        header: '',
                        text: '',
                        author: ''
                    } 

    }


}

newPostController.$inject = ['$scope','PostService','$timeout','$location','AppProperties'];
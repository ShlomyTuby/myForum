
angular.module('ngForum')
.component('mainNav',{
    templateUrl: 'main-nav/main-nav.template.html',
    controller: mainNavController,
});


function mainNavController($rootScope,$scope,$location,appProperties){
    $scope.appName = 'ngForum'
    $scope.userName = '';

    function constructor(){
        console.log('constructor');
        appProperties.getProperty('userName')
            .then(function(userName){
                console.log('mainNavController:constructor:userName',userName);
                $scope.userName = userName;
            },function(error){
                console.log('mainNavController:constructor:userName:faild',error);
            });
    }
    constructor();

    $scope.$watch('userName',function(newValue,oldValue){
        console.log('mainNavController:watch:userName',newValue,oldValue);
        if( newValue !== oldValue ){
            appProperties.setProperty('userName',newValue);
        }
    },true);

    $scope.isActive = function(urlPart){
        var url = $location.url();
        if( url.indexOf(urlPart) == 0 ){
            return true;
        }
        else {
            return false;
        }
    }
}

mainNavController.$inject = ['$rootScope','$scope','$location','AppProperties'];
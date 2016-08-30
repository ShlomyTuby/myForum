
angular.module('ngForum')
.component('mainNav',{
    templateUrl: 'main-nav/main-nav.template.html',
    controller: mainNavController,
});


function mainNavController($scope,$location,appProperties){
    $scope.appName = 'ngForum'
    $scope.userName = null;

    function constructor(){
        appProperties.registerForChange('userName',function(newVal,oldVal){
            if( $scope.userName == null && $scope.userName != newVal ){
                console.log('mainNavController:registerForChange',newVal,oldVal);
                $scope.userName = newVal;
                try {
                    $scope.$digest();   
                } catch (error) {
                    
                }
            }
        });

        $scope.$watch('userName',function(newValue,oldValue){
            if( (newValue != null ||  oldValue != null ) && newValue !== oldValue ){
                console.log('mainNavController:watch:userName',newValue,oldValue);
                appProperties.setProperty('userName',newValue);
            }
        },true);
    }
    constructor();

    

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

mainNavController.$inject = ['$scope','$location','AppProperties'];
/**
 * 
 * Main Nav Controller
 *  controller for Nav element
 *      header and tabs
 */
angular.module('myForum')
    .component('mainNav',{
        templateUrl: 'main-nav/main-nav.template.html',
        controller: MainNavController,
        controllerAs: 'navCtrl'
    });


MainNavController.$inject = ['$scope','$location','AppPropertiesService','UserService'];

function MainNavController($scope,$location,AppPropertiesService,UserService){

    var that = this;
    that.isActive = isActive;
    //local varible
    that.appName = 'myForum';
    $scope.userName = null;
    
    function constructor(){        

        /**
         *  get current global app Prop 'name' field' 
         */
        AppPropertiesService.getProperty('userName')
            .then(function(userName){
                $scope.userName = userName;      
                !$scope.$$phase || $scope.$digest();      
            });
        /**
         *  register For App Prop 'name' field Change
         */
        AppPropertiesService.registerForChange('userName',function(newVal,oldVal){
            if( $scope.userName == null && $scope.userName != newVal ){
                $scope.userName = newVal;
                !$scope.$$phase || $scope.$digest();
            };
            that.loginUser = null;
            UserService.GetByUsername(newVal)
                .then(function(user){
                    that.loginUser = user;
                });
        });


    }

    function isActive(urlPart) {
        var url = $location.url();
        if( url.indexOf(urlPart) == 0 ){
            return true;
        }
        else {
            return false;
        }
    }

    constructor();
};
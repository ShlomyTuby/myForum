/** 
 * 
 *  Register Component
 * 
 */
angular.module('myForum')
    .component('register',{
        templateUrl: 'register/register.template.html',
        controller: RegisterController,
    });

RegisterController.$inject = ['$scope','UserService','$location'];

function RegisterController($scope,UserService,$location){

    var that = this;

    that.register = register;
    that.removeError = removeError;

    function constructor (){
         
        that.$onInit = function(){
            
        };
        

    };

    /**
     * register 
     */
    function register() {
        that.dataLoading = true;
        UserService.Create(that.user)
        .then(function (response) {
                if (response.success) {
                    $location.path('/login');
                } else {
                    if( response.error == 'duplicate_user_name' ){
                      $scope.form.username.$setValidity("duplicate",false); 
                    }
                    that.dataLoading = false;
                }
        });

    };

    function removeError(errorKey,fieldName){
        if($scope.form && $scope.form[fieldName]){
            $scope.form[fieldName].$setValidity(errorKey,true);
        };
    };

    //this.$onInit()
    constructor();

    return that;
};
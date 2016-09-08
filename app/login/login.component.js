/** 
 * 
 *  Login Component
 * 
 */
angular.module('myForum')
    .component('login',{
        templateUrl: 'login/login.template.html',
        controller: LoginController,
    });

LoginController.$inject = ['$scope','AuthenticationService','$location'];

function LoginController($scope,AuthenticationService,$location){

    var that = this;

    that.login = login;

    function constructor (){
         
        that.$onInit = function(){
            
            /**
             * 
             */
            AuthenticationService.ClearCredentials();
            
        };
        

    };

    /**
     * login 
     */
    function login() {
        that.dataLoading = true;
        AuthenticationService.Login(that.username, that.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(that.username, that.password);
                    $location.path('/');
                } else {
                    that.dataLoading = false;
                }
            });

    };

    //this.$onInit()
    constructor();

    return that;
};
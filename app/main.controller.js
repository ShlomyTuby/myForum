/**
 * Main Controller
 */
angular.module('myForum')
    .controller('MainController',MainController);

MainController.$inject = ['$scope'];

function MainController($scope) {

    var that = this;

    function constructor() {
        that.appSubTitle = 'myForum';
        that.appTitle = 'post and replay';
    };
    
    constructor();
};
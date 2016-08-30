angular.module('ngForum')
.factory('AppProperties',AppProperties);

function AppProperties($rootScope,$q,localStorage){

    function getDate(){
        localStorage.get('appProperties')
        .then(function(appProperties){
             console.log('getDate','appProperties',appProperties);
             $rootScope.appProperties = appProperties;
        });
    }

    function saveData(){
        console.log('saveData','appProperties',$rootScope.appProperties);
        localStorage.set('appProperties',$rootScope.appProperties);
    }

    function constructor(){
       $rootScope.appProperties = $rootScope.appProperties || {};
       getDate();
    }
    constructor();

    that = this;

    that.getProperty = function(key){

        var deferred = $q.defer();
            setTimeout(function() {
                if(!$rootScope.appProperties[key]){
                    deferred.reject(
                        { error: 'no key ' + key + ' found' }
                    )
                }else{
                    console.log('getProperty','$rootScope.appProperties['+key+']',$rootScope.appProperties[key]);
                    deferred.resolve(
                        $rootScope.appProperties[key]
                    );
                }
            }, 1000);
            return deferred.promise;
    }

    that.setProperty = function(key,value){
        console.log('setProperty','key',key,'value',value);
        var deferred = $q.defer();
            setTimeout(function() {
                    $rootScope.appProperties[key] = value;
                    saveData();
                    deferred.resolve(
                        $rootScope.appProperties[key]
                    );
                
            }, 1000);
            return deferred.promise;
    }


    return that;
}

AppProperties.$inject = ['$rootScope','$q','LocalStorageService'];
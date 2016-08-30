angular.module('ngForum')

.factory('LocalStorageService',LocalStorageService);

function LocalStorageService($localStorage,$q){

    this.localStorage = {
        userName: 'Gust User'
    };

    that = this;

    that.get = function(key){
        var localStorage = this.localStorage;
        var deferred = $q.defer();
            setTimeout(function() {
                if(!localStorage[key]){
                    deferred.reject(
                        { error: 'no ' + key + ' found' }
                    )
                }else{
                    deferred.resolve(
                        localStorage[key]
                    );
                }
            }, 1000);
            return deferred.promise;
    }

    that.set = function(key,value){
        console.log('set','key',key,'value',value);
        var localStorage = this.localStorage;
        var deferred = $q.defer();
            setTimeout(function() {
                    localStorage[key] = value;
                    $localStorage[key] = value;
                    deferred.resolve(
                        localStorage[key]
                    );
                
            }, 1000);
            return deferred.promise;
    }

    function constructor($localStorage){
        $localStorage.$default(this.localStorage);
        this.localStorage = $localStorage;
    }($localStorage);

    return that;
};

LocalStorageService.$inject = ['$localStorage','$q'];
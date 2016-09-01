/**
 * Local Storage Service
 * implament the $localStorage Service
 */
angular.module('myForum')
    .service('LocalStorageService',LocalStorageService);

LocalStorageService.$inject = ['$localStorage','$q'];

function LocalStorageService($localStorage,$q){

    var that = this;
    that.get = get;
    that.set = set;

    function constructor() {

    };

    function get(key){
        var deferred = $q.defer();
                if(!$localStorage[key]) {
                    deferred.reject(
                        { error: 'no ' + key + ' found' }
                    )
                } else {
                    deferred.resolve(
                        $localStorage[key]
                    );
                }
            return deferred.promise;
    };

    function set(key,value){
        var deferred = $q.defer();
                    $localStorage[key] = value;
                    deferred.resolve(
                        $localStorage[key]
                    );
            return deferred.promise;
    };

    constructor();
};
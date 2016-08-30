angular.module('ngForum')
.factory('AppProperties',AppProperties);

function AppProperties($q,localStorage){

    var that = this;

    function getDate(){
        localStorage.get('appProperties')
        .then(function(appProperties){
             console.log('getDate','appProperties',appProperties);
             that.appProperties = appProperties;
        });
    }

    function saveData(){
        console.log('saveData','appProperties',that.appProperties);
        localStorage.set('appProperties',that.appProperties);
    }

    function constructor(){
       that.appProperties = that.appProperties || {};
       getDate();
    }
    constructor();


    that.getProperty = function(key){

        var deferred = $q.defer();
            setTimeout(function() {
                if(!that.appProperties[key]){
                    deferred.reject(
                        { error: 'no key ' + key + ' found' }
                    )
                }else{
                    console.log('getProperty','that.appProperties['+key+']',that.appProperties[key]);
                    deferred.resolve(
                        that.appProperties[key]
                    );
                }
            }, 1000);
            return deferred.promise;
    }

    that.setProperty = function(key,value){
        console.log('setProperty','key',key,'value',value);
        var deferred = $q.defer();
            setTimeout(function() {
                    that.appProperties[key] = value;
                    saveData();
                    deferred.resolve(
                        that.appProperties[key]
                    );
                
            }, 1000);
            return deferred.promise;
    }


    return that;
}

AppProperties.$inject = ['$q','LocalStorageService'];
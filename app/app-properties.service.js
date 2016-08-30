angular.module('ngForum')
.factory('AppProperties',AppProperties);

function AppProperties($q,localStorage){

    var that = this;
    var self = this;

    function getDate(){
        localStorage.get('appProperties')
        .then(function(appProperties){
             console.log('getDate','appProperties',appProperties);
             that.appProperties = appProperties;
             for(prop in that.appProperties){
                 console.log('appProperties:getDate:for:prop',prop,that.appProperties[prop])
                 self.applyChange(prop,that.appProperties[prop],null)
             }
        },console.error)
    }

    function saveData(){
        console.log('saveData','appProperties',that.appProperties);
        localStorage.set('appProperties',that.appProperties);
    }

    function constructor(){
       getDate();
    }
    constructor();


    that.getProperty = function(key){

        var deferred = $q.defer();
                if(!that.appProperties || !that.appProperties[key]){
                    deferred.reject(
                        { error: 'no key ' + key + ' found' }
                    )
                }else{
                    console.log('getProperty','that.appProperties['+key+']',that.appProperties[key]);
                    deferred.resolve(
                        that.appProperties[key]
                    );
                }
            return deferred.promise;
    }

    that.setProperty = function(key,value){
        console.log('setProperty','key',key,'value',value);
        var deferred = $q.defer();
                    self.applyChange(key,value,that.appProperties[key]);
                    that.appProperties[key] = value;
                    saveData();
                    deferred.resolve(
                        that.appProperties[key]
                    );
            return deferred.promise;
    }

    self.applyChange = function(prop,newVal,oldVal){
        if(self.registerForChangeArr && self.registerForChangeArr[prop]){
            self.registerForChangeArr[prop]
            self.registerForChangeArr[prop].forEach(function(cbFn) {
                cbFn(newVal,oldVal);
            });
        }
    }

    that.registerForChange = function(prop,cbFn){
        if( !prop ){
            throw 'property name required';
        }
        if( !cbFn ){
            throw 'callback function required';
        }
        if(!self.registerForChangeArr){
            self.registerForChangeArr = {};
        }
        if(!self.registerForChangeArr[prop]){
            self.registerForChangeArr[prop] = [];
        }
        self.registerForChangeArr[prop].push(cbFn);
    }

    return that;
}

AppProperties.$inject = ['$q','LocalStorageService'];
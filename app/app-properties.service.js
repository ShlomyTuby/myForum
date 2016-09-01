/**
 * 
 *  App Properties Service 
 */
angular.module('myForum')
    .service('AppPropertiesService',AppPropertiesService);

AppPropertiesService.$inject = ['$q','LocalStorageService'];

function AppPropertiesService($q,LocalStorageService){

    var that = this;
    that.getProperty = getProperty;
    that.setProperty = setProperty;
    that.registerForChange = registerForChange;

    //local varible
    appProperties = {};
    registerForChangeArr = {};

    function constructor() {
        initData()
    };

    function initData() {
        LocalStorageService.get('appProperties')
        .then(function(data){
             appProperties = data;
             for(prop in appProperties){
                 applyChange(prop,appProperties[prop],null)
             }
        },console.error)
    }

    function saveData(){
        LocalStorageService.set('appProperties',appProperties);
    }

    function getProperty(key) {
        var deferred = $q.defer();
                if(!appProperties || !appProperties[key]){
                    deferred.reject(
                        { error: 'no key ' + key + ' found' }
                    )
                }else{
                    deferred.resolve(
                        appProperties[key]
                    );
                }
            return deferred.promise;
    }

    function setProperty(key,value) {
        var deferred = $q.defer();
                    applyChange(key,value,appProperties[key]);
                    appProperties[key] = value;
                    saveData();
                    deferred.resolve(
                        appProperties[key]
                    );
            return deferred.promise;
    };

    function applyChange(prop,newVal,oldVal) {
        if(registerForChangeArr && registerForChangeArr[prop]){
            registerForChangeArr[prop].forEach(function(cbFn) {
                cbFn(newVal,oldVal);
            });
        }
    };

     function registerForChange(prop,cbFn) {
        if( !prop ){
            throw 'property name required';
        }
        if( !cbFn ){
            throw 'callback function required';
        }
        if(!registerForChangeArr){
            registerForChangeArr = {};
        }
        if(!registerForChangeArr[prop]){
            registerForChangeArr[prop] = [];
        }
        registerForChangeArr[prop].push(cbFn);
    };

    constructor();
};
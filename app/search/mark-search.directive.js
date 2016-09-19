
angular.module('myForum')
.directive('marksearch', function() {
    return {
        restrict: 'A',
        require: ['^post'],
        link: function(scope,elem,attrs,postCtrl){
           // console.log(scope,elem,attrs,ctrl);
            

            scope.$on('searchTextChange',function(event,searchText){
                if(searchText){
                    var text = elem.text();
                    var regex = new RegExp(searchText, "gi");
                    if( text.match(regex) ) {
                        console.log(text,searchText,text.replace(regex,'<span style="color:red">'+searchText+'</span>'));
                        elem.html(text.replace(regex,function(x){return '<span style="color:red">'+x+'</span>';}));
                    }
                } else {
                    elem.html(elem.text());
                }
                
            });
        }
    }
});



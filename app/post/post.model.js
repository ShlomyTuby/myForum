
/**
 * 
 * Post
 * 
 */
var Post = function(props){
    
    var that = new Object();
    
    that._id = null;
    that.header = null;
    that.text = null;
    that.author = null;
    that.parentPostId = null;
    that.children = [];
    
    this.constructor.call(that,props);
    return that;
};

Post.prototype.constructor = function(props){
        this._id = Date.now();
        if(props){
            this.header = props.header || this.header;
            this.text = props.text || this.text;
            this.author = props.author || this.author;
            this.parentPostId = props.parentPostId || this.parentPostId;
            if ( props.children ){
                this.children = [];
                for (var index = 0; index < props.children.length; index++) {
                    this.children = new Post( props.children[index] );
                }
            }
        }
        return this;
    };

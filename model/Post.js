var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema = new Schema({
    header: String,
    text: String,
    author: String,
    timeCreated: { type: Date, default: Date.now },
    parentPostId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Post',PostSchema);
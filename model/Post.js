var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema = new Schema({
    header: String,
    text: String,
    author: String,
    timeCreated: { type: Date, default: Date.now },
    parentPostId: mongoose.Schema.Types.ObjectId,
    replayCount: { type: Number, default: 0 },
    viewersCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post',PostSchema);
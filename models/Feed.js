var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
  created_time : "String",
  message : "String"
});

module.exports = mongoose.model('Feed', FeedSchema);

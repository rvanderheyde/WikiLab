var mongoose = require('mongoose');

var exports = {};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

// defining schema for users
// for votes object,might need to use .commit()
// https://groups.google.com/forum/#!topic/mongoose-orm/3wmwUX5Fve4
var userSchema = mongoose.Schema({
  name: String,
  votes: {}
});

exports.User = mongoose.model('User', userSchema);

var postSchema = mongoose.Schema({
  title: String,
  content: String,
  locked: Boolean,
  dateCreated: Date,
  views: Number,
  votes: Number
});

exports.Post = mongoose.model('Post', postSchema);

module.exports = exports;
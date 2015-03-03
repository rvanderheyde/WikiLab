// Routes for all get requests

var path = require('path');
var schema = require('./../models/schema');
var User = schema.User;
var Post = schema.Post;
routes = {};

// Function to render home page
routes.homeRender = function(req, res) {
  var url = path.resolve( __dirname + '../../views/main.html');
  res.sendFile(url);
};

// Function to get a list of all pages that have been created
routes.getPages = function(req, res) {
  Post.find({}, function(err, data){
    if (err){ console.log(error); }
    var obj = { pages: data };
    console.log(obj);
    res.send(obj);
  });
};

// Function to load a specific wiki page
routes.gettaPage = function(req, res) {
  var url = req.params.pagename;
  // If request was ajax request from button
  if (req.headers.accept.indexOf('json') > -1) {
    Post.findOne({url: url})
    .exec(function (err, post) {
      if (err) {
        console.log('error getting page');
        res.status(500).json(err);
      } else if (!post) {
        console.log('page doesnt exist');
        res.status(404).json(err);
      } else {
        console.log('retrieving page info');
        res.json(post);
      }
    })
  } else {
    // If request was get request from refresh or typing url
    var url = path.resolve( __dirname + '../../views/main.html');
    res.sendFile(url);
  }
};

// Function to get user upvotes and downvotes when on a wiki page
routes.getUserinfo = function(req, res) {
  var name = req.params.username;
  User.findOne({name: name})
    .exec(function (err, user) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(user);
      }
    });
};

module.exports = routes;
var path = require('path');
var schema = require('./../models/schema');
var User = schema.User;
var Post = schema.Post;
routes = {}

routes.homeRender = function(req, res) {
  var url = path.resolve( __dirname + '../../views/main.html');
  res.sendFile(url);
};

routes.getPages = function(req, res) {
  Post.find({}, function(err, data){
    if (err){ console.log(error); }
    var obj = { pages: data };
    console.log(obj);
    res.send(obj);
  });
};

routes.gettaPage = function(req, res) {
  var url = req.params.pagename;
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
};
module.exports = routes;
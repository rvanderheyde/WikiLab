var schema = require('./../models/schema');
var User = schema.User;
var Post = schema.Post;
var exports = {};

// Vote handling function
exports.vote = function (data) {
  // might have to change this
  var name = data.username;
  var page = data.page;
  var vote = data.vote;

  User.findOne({name: name})
    .exec(function (err, user) {
      if (err) {
        console.log('database call failed');
        res.status(500).json(err);
      } else {
        Post.findOne({title: page})
          .exec(function (err, post) {
            if (err) {
              console.log('could not find post');
              res.status(500).json(err);
            } else {
              // assuming vote is a bool
              if (vote) {
                post.votes += 1;
                user.page = 1;
              } else {
                post.votes -= 1;
                user.page = -1;
              }
              post.save(function (err) {
                if (err) {
                  console.log('unable to save post');
                  res.status(500).json(err);
                } else {
                  user.save(function (err) {
                    if (err) {
                      console.log('unable to save user');
                      res.status(500).json(err);
                    } else {
                      console.log('yeee it all works')
                      res.json({vote: vote});
                    }
                  });
                }
              })
            }
          });
      }
    });
};

// submit a new page
exports.newPage = function (data) {
  // need to actually see how data object is structured
  url = data.url;
  title = data.title;
  content = data.content;
  user = data.user;

  post = new Post({
    // do shit here
  });
}



module.exports = exports;
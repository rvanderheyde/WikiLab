var schema = require('./../models/schema');
var User = schema.User;
var Post = schema.Post;
var exports = {};

// Vote handling function
exports.vote = function (req, res) {
  var data = req.body;
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
exports.newPage = function (req, res) {
  Post.find({})
    .exec(function (err, posts) {
      console.log('THESE ALL THE POSTS BRUH');
      console.log(posts)
      console.log('')
    })

  var data = req.body;

  var post = new Post({
    url: data.url,
    title: data.title,
    content: data.content,
    locked: false,
    author: data.user,
    views: 0,
    votes: 0
  });
  console.log('NEW POST YEEE');
  console.log(post);

  post.save(function (err) {
    if (err) {
      console.log('Problem saving new post');
      res.status(500).json(err);
    } else {
      console.log('yayy made a new post');
      // send post back to client
      res.json(post);
    }
  });
}

exports.editPage = function (req, res) {
  var data = req.body;
  url = data.url;
  content = data.content;

  Post.find({url: url})
    .exec(function (err, post) {
      if (err) {
        console.log('couldnt find this post');
        res.status(500).json(err);
      } else {
        post.content = content;
        post.save(function (err) {
          if (err) {
            console.log('couldnt save edited post');
          } else {
            console.log('yay successfully edited post');
            // send back post to client
            res.json(post);
          }
        })
      }
    })
}

module.exports = exports;
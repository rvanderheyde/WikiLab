var schema = require('./../models/schema');
var User = schema.User;
var Post = schema.Post;
var exports = {};

// Vote handling function
exports.vote = function (req, res) {
  var data = req.body;
  var name = data.username;
  var page = data.page;
  var vote = data.vote;
  
  User.findOne({name: name})
    .exec(function (err, user) {
      if (err) {
        console.log('database call failed');
        res.status(500).json(err);
      } else {
        Post.findOne({url: page})
          .exec(function (err, post) {
            if (err) {
              console.log('could not find post');
              res.status(500).json(err);
            } else {
              var up_index = user.upvotes.indexOf(page);
              var down_index = user.downvotes.indexOf(page);
              if (up_index !== -1) {
                if (!vote) {
                  console.log('PREVIOUSLY UPVOTED, NOW DOWNVOTING');
                  post.votes -= 2;
                  user.downvotes.push(page);
                } else {
                  console.log('PREVIOUSLY UPVOTED, NOW NOTHING');
                  post.votes -= 1;
                }
                user.upvotes.splice(up_index, 1);
              } else if (down_index !== -1) {
                if (vote) {
                  console.log('PREVIOUSLY DOWN, NOW UP');
                  post.votes += 2;
                  user.upvotes.push(page);
                } else {
                  console.log('PREVIOUSLY DOWN, NOW NOTHING');
                  post.votes += 1;
                }
                user.downvotes.splice(down_index, 1);
              } else {
                // not upvoted or downvoted
                if (vote) {
                  console.log('NEW AND UP')
                  post.votes += 1;
                  user.upvotes.push(page);
                } else {
                  console.log('NEW AND DOWN')
                  post.votes -= 1;
                  user.downvotes.push(page);
                }
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
                      console.log(user);
                      User.findOne({name: name}, function (err, updated_user) {
                        console.log(updated_user);
                      })
                      res.json(post);
                    }
                  });
                }
              });
            }
          });
      }
    });
};

// submit a new page
exports.newPage = function (req, res) {
  var data = req.body;

  Post.findOne({url: data.url})
    .exec(function (err, post) {
      if (post) {
        // Change URL to URL + '2' if URL already exists in db
        console.log('');
        console.log('POST WITH DIS URL ALREADY EXIST THO');
        data.url += '2';
      }
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
    });
}

exports.editPage = function (req, res) {
  var data = req.body;
  url = data.url;
  content = data.content;
  console.log(content);

  Post.findOne({url: url})
    .exec(function (err, post) {
      if (err) {
        console.log('couldnt find this post');
        res.status(500).json(err);
      } else {
        console.log(post)
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
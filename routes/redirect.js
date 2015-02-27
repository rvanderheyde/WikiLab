var schema = require('./../models/schema');
var exports = {}

// allows authenticated users to vote
exports.authVote = function(name, page, vote) {
	Post.findOne({title: page})
		.exec(function (err, post) {
			if (err) {
				console.log('could not find post');
				res.status(500).json(err);
			} else if (!vote) {
				console.log('page doesnt exist in db');
				res.status(500).send('post doesnt exist');
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

// Vote handling function
exports.vote = function(data) {
	// might have to change this
	var name = data.username;
	var page = data.page;
	var vote = data.vote;

	User.findOne({name: name})
		.exec(function (err, user) {
			if (err) {
				console.log('database call failed');
				res.status(500).json(err);
			} else if (!user) {
				console.log('user is not authenticated to vote')
				res.status(500).send('user doesnt exist');
			} else {
				exports.authVote(user, page, vote);
			}
		})
}
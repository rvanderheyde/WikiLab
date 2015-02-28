var path = require('path');
<<<<<<< Updated upstream
var Post = require('../models/schema').Post;
=======
var schema = require('./../models/schema');
var User = schema.User;
var Post = schema.Post;
>>>>>>> Stashed changes
routes = {}

routes.homeRender = function(req, res){
	var url = path.resolve( __dirname + '../../views/main.html');
	res.sendFile(url);
};

routes.getPages = function(req, res){
	Post.find({}, function(err, data){
		if (error){ console.log(error); }
		var obj = { pages: data };
		res.send(obj);
	});
};

module.exports = routes;
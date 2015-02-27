var path = require('path');
var Post = require('../models/schema').Post;
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
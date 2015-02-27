var path = require('path');
var schema = require('./../models/schema');
routes = {}

routes.homeRender = function(req, res){
	var url = path.resolve( __dirname + '../../views/main.html');
	res.sendFile(url);
};

module.exports = routes;
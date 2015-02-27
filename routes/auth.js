routes = {};

routes.fbAuth = function(req, res){
};

routes.fbAuthCallback = function(req, res){
	console.log('FB returns' + req.session.passport.user.displayName);
	// res.redirect('/');
	res.redirect('/');
};

routes.getUsername = function(req,res){
	var username = req.session.passport.user.displayName;
	var obj = { userName: username};
	res.send(obj)
};

module.exports = routes;
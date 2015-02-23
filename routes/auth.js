routes = {};

routes.fbAuth = function(req, res){

};

routes.fbAuthCallback = function(req, res){
	var username = req.session.passport.user.displayName;
	var obj = { userName: username};
	res.send(obj)
};

module.exports = routes;
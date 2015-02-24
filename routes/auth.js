routes = {};

routes.fbAuth = function(req, res){

};

routes.fbAuthCallback = function(req, res){
	var username = req.session.passport.user.displayName;
	var obj = { userName: username};
	console.log(obj);
	res.redirect('/');
};

module.exports = routes;
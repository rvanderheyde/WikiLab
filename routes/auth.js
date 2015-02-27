routes = {};

routes.fbAuth = function(req, res){
};

routes.fbAuthCallback = function(req, res){
	console.log('FB returns' + req.session.passport.user.displayName);
	// res.redirect('/');
	res.redirect('/');
};

routes.getUsername = function(req, res){
	var username = req.session.passport.user.displayName;
	var obj = {userName: username};
	res.send(obj)
};

// Called by client when logging out to get rid of user credentials from session
routes.loggingOut = function(req, res) {
  // might have to change this depending on how we save things
  req.session.passport = {};
  req.session.userid = '';
  
  // send something to client to change client
  res.send('logout');
};

module.exports = routes;
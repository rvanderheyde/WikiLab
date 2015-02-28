routes = {};
var User = require('../models/schema').User;

routes.fbAuth = function(req, res){
};

routes.fbAuthCallback = function(req, res){
	console.log('FB returns ' + req.session.passport.user.displayName);
	var username = req.session.passport.user.displayName;
	User.findOne({name: username}, function(error, user){
		if (user) {
			res.redirect('/');
		} else {
			var newUser = User({name: username, votes: {}})
			newUser.save();
			res.redirect('/')
		}
	});
	// res.redirect('/');
	
};

routes.getUsername = function(req,res){
	console.log(req.session.passport)
	if (emptyObjTest(req.session.passport) === true){
		res.send('error');
	} else {
		var username = req.session.passport.user.displayName;
		var obj = { userName: username};
		console.log(obj)
		if (username === undefined){
			res.send('No User');
		} else {
			res.send(obj);
		}
	}
};

function emptyObjTest(obj){
	return Object.keys(obj).length === 0;
};

module.exports = routes;
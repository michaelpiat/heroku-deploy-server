var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User.js');

function configure(passport) {

	var strategyFunc = function(username, password, done) {

		User.authenticate(username, password, function(err, user) {
			if (err) {
				console.log('LocalStrategy - Error trying to authenticate');
				done(err);
			}
			else if (user) {
				console.log('LocalStrategy - Successful login');
				done(null, user);
			}
			else {
				console.log('LocalStrategy - could not find user or whatever');
				done(null, false);
			}
		});
	}


	passport.use(new LocalStrategy(strategyFunc));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

}

module.exports = {
	configure
};
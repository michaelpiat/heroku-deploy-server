var router = require('express').Router();
var User = require('../models/User.js');
var path = require('path');
var passport = require('passport');


router.get('/isloggedin', function(req, res) {
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.header("Pragma", 'no-cache');
	res.header('Expires', 0);
	if (req.user) {
		res.send('1')
	}
	else {
		 res.send('0')
	}
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/'
}));


router.post('/register', function(req, res, next) {

	console.log("body", req.body);

	var user = new User({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		LastName: req.body.LastName,
		userEmail: req.body.userEmail 
	});
	user.save(function(err) {
		if (err) {
			console.log('error with saving user', err);
		}
		next();
		
	});
}, passport.authenticate('local', {
	successRedirect: '/',
}));

router.get('/logout', function(req, res) {
	req.logout();
	 req.session.destroy();
	res.redirect('/');
});

router.get("/user", function(req, res) {
	User.findOne({
		username: req.user.username
	}, function(err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});

module.exports = router; 

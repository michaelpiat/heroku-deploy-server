var router = require('express').Router();
var Recipe = require("../models/Recipe.js");
var User = require("../models/User.js");
const env = require('env2')('./.env');
const sendemail = require('sendemail')
const email = sendemail.email
const set_template_directory = sendemail.set_template_directory
set_template_directory('./templates')


var path = require('path');

function authRequired(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		 res.sendStatus(403);
	}

};

router.get('/login', function(req, res) {

	res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.header("Pragma", 'no-cache');
	res.header('Expires', 0);
	
	res.sendFile(path.join(__dirname, "../public","login.html"))
});


router.post('/save', authRequired, function(req, res) {
	console.log('the user?', req.user);
	var newRecipe = new Recipe(req.body);
	console.log(req.body);
	newRecipe.save(function(err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			User.findOneAndUpdate({"username": req.user.username}, { $push: { "recipes": doc._id} }, {new: true}, function(err, newdoc) {
				if (err) {
					res.send(err);
				}
				else {
					res.send(newdoc);
				}
			});
		}
	});
});

router.get("/myfaves", authRequired, function(req, res) {
	User.findOne({ username: req.user.username
	})
		
	.populate("recipes")

	.exec(function(err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});


router.post("/myfaves/delete/:recipeMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Recipe.findByIdAndRemove(req.params.recipeMongoId, function (err, todo) {
    if (err) {
      // Send Failure Header
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
    	console.log("recipe removed")
      // Send Success Header
      res.sendStatus(200);
    }
  });

});

router.post('/sendemail', function(req, res) {
	
	if (req.user) {

			console.log("route hit");
			console.log(req.user)
			

			var person = {
		  		name : req.user.firstName,
		  		email: req.user.userEmail,
		  		subject:"Your recipe from CooksCupboard",
		  		recipe: req.body
			}
			
		email('emailTemp', person, function(error, result){
		  console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
		  console.log(result);
		  console.log(error);
		  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
		})
	}
	
});

router.post('/senddbemail', function(req, res) {
	
	if (req.user) {

			console.log("route hit");
			console.log(req.user);
			console.log(req.body);
			

			var person = {
		  		name : req.user.firstName,
		  		email: req.user.userEmail,
		  		subject:"Your recipe from CooksCupboard",
		  		recipe: req.body
			}
			
		email('emailTemp', person, function(error, result){
		  console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
		  console.log(result);
		  console.log(error);
		  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
		})
	}
	
});


module.exports = router; 
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	firstName: {type: String, require: true},
	LastName: {type: String, require: true},
	userEmail: {type: String, require: true},
	username: { type: String, unique: true, require: true },
	passwordHash: { type: String, require: true },
	recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe"}]
});


userSchema.virtual('password')
	.get(function() { return null; })
	.set(function(value) {
		var hash = bcrypt.hashSync(value, 10);
		this.passwordHash = hash;
	});


userSchema.methods.authenticate = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {

	this.findOne({ username: username }, function(err, user) {
		if (err) {
			console.log('error attempting to use static authenticate function', err);
			done(err);
		}
		else if (user && user.authenticate(password)) {
			console.log('this should be a good login');
			done(null, user);
		}

		else {
			console.log('password probably wrong');
			done(null, false);
		}

	}); 
}





var User = mongoose.model('User', userSchema);

module.exports = User;


var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {type:String, unique: true, sparse: true},
	name: {type: String, unique: true},
	password: String,
	description: String,
	type: Number,
	registrationDate: { type: Date, default: Date.now },
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

UserSchema.statics.types = {
	ADMIN: 2,
	AUTHOR: 1,
	BUDDY: 0
};

UserSchema.statics.buddyNotAllowed = ['password', 'type', 'registrationDate', 'articles'];
UserSchema.statics.authorNotAllowed = UserSchema.statics.buddyNotAllowed;

UserSchema.statics.dataForOwner = function (user) {
	console.log('user: ', user);
	return {
		email: user.email,
		name: user.name,
		description: user.description,
		registrationDate: user.registrationDate,
		articles: user.articles,
		events: user.events,
		id: user._id
	}
};

UserSchema.statics.dataForAnyone = function (user) {
	return {
		name: user.name,
		description: user.description,
		registrationDate: user.registrationDate,
		articles: user.articles
	}
};


module.exports = UserSchema;
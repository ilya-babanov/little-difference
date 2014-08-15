var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	// main data
	title: String,
	content: String,
	date: { type: Date, default: Date.now, index: true},
	votes: Number,
	tags: [{name: String}],
	
	// event data
	eventDate: Date,
	eventDuration: Number,
	eventLocation: String,
	eventCoordinates: {lat: Number, lon: Number},
	followers: [{user: { type: Schema.Types.ObjectId, ref: 'User' }}],
	maxFollowers: Number,
	
	// comments data
	comments: [{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		body: String, date: { type: Date, default: Date.now }
	}],
	disableComments: Boolean,
	
	// additional data
	hidden: Boolean
});

/*PostSchema.statics.types = {
	EVENT: 0,
	POST: 1,
	POLL: 2
};*/

module.exports = PostSchema;
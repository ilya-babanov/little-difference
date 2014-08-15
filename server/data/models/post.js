var mongoose = require('mongoose'),
	PostSchema = require('../schemas/post');

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
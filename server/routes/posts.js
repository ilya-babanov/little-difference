var loadUser = require('./middleware/loadUser'),
	isAdmin = require('./middleware/isAdmin'),
	Post = require('../data/models/post');

module.exports = function(app) {
	
	app.get('/api/posts/all/:month', loadUser, function(req, res) {
		var startDate = new Date(2014, req.params.month).valueOf(),
			endDate = new Date(2014, req.params.month+1).valueOf();
		Post.find({date: { $gte: startDate, $lte: endDate}},
			function(err, events) {
				if (err) {
					res.send(404, 'Not Found');
					return;
				}
				res.send(200, events);
			});
	});
	
	//only for admins
	app.post('/api/posts/:id', loadUser, isAdmin, function(req, res) {
		Post.create(req.body,
			function (err, createdEvent) {
				if (err) {
					res.send(501, 'Internal error');
					return;
				}
				res.send(200, createdEvent);
			});
	});
	
	app.put('/api/posts/:id', loadUser, isAdmin, function(req, res) {
		Post.findByIdAndUpdate(req.body.id, req.body,
			function (err, createdEvent) {
				if (err) {
					res.send( 501, 'Internal error');
					return;
				}
				console.log('createdEvent: ', createdEvent);
				res.send(200);
			});
	});
	
	app.delete('/api/posts/:id', loadUser, isAdmin, function(req, res) {
		Post.findByIdAndRemove(req.body.id,
			function(err) {
				if (err) {
					res.send(501, 'Internal Error while finding event');
					return;
				}
				res.send(200);
		});
	});
	
};
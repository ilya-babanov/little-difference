var exceptLogged = require('./middleware/exceptLogged'),
	loadUser = require('./middleware/loadUser'),
	restrictUserToSelf = require('./middleware/restrictUserToSelf'),
	delayCheck = require('./middleware/delayCheck'),
	honeypotCheck = require('./middleware/honeypotCheck'),
	processUserData = require('./middleware/processUserData'),
	isAdmin = require('./middleware/isAdmin'),
	sessionCheck = require('./middleware/sessionCheck'),
	createSessionToken = require('./logic/createSessionToken'),
	User = require('../data/models/user');

module.exports = function(app) {

	/**
	 * Get info about all users
	 */
	app.get('/api/users', sessionCheck, isAdmin, function(req, res) {
		console.log('req.session: ', req.session);
		User.find()
			.select('-password -events')
			.exec(function(err, users) {
				if (err) {
					res.send(404, 'User with that name not found');
					return;
				}
				res.send(200, users);
			});
	});

	/**
	 * Get info about user with given name
	 */
	app.get('/api/users/:name', sessionCheck, loadUser, function(req, res) {
		if (!req.session.user || req.session.user.name !== req.user.name) {
			res.send(200, User.dataForAnyone(req.user));
		} else {
			res.send(200, User.dataForOwner(req.user));
		}
	});

	/**
	 * Register new user
	 */
	app.post('/api/users', delayCheck, honeypotCheck, /*exceptLogged,*/ function(req, res) {
		User.findOne({name: req.body.name},
			function(err, user) {
				if (err) {
					res.send(501, 'Internal Error while finding users');
					return;
				} else if (user) {
					res.send(409, 'User with that name already registered');
					return;
				}
				User.create(req.body,
					function(err, createdUser) {
						if (err) {
							res.send(501, 'Internal Error while creating user');
						} else {
							console.log('user: ', createdUser);
							req.session.user = createdUser;
							var userData = User.dataForOwner(req.session.user);
							userData.token = createSessionToken();
							req.session.token = userData.token;
							res.send(200, userData);
						}
					}
				);
				
			});
	});
	
	/**
	 * Delete user
	 */
	app.del('/api/users/:name', sessionCheck, restrictUserToSelf, loadUser, function(req, res) {
		req.user.remove(function(err) {
			if (err) {
				res.send(501, 'Internal Error while finding users');
				return;
			}
			res.send(200);
		});
	});

	/**
	 * Update user data
	 */
	app.put('/api/users/:name', sessionCheck, restrictUserToSelf, processUserData, function (req, res) {
		User.findOne({name: req.params.name},
			function (err, user) {
				if (err || !user) {
					res.send(501, 'Internal Error while finding user');
					return;
				}
				
				for (var key in req.body) {
					user[key] = req.body[key];
				}
				
				user.save(function (err) {
					if (err) {
						if (err.code === 11001) {
							res.send(501, 'User with that name already exist');
						} else {
							res.send(501, 'Internal Error while updating user');
						}
						return;
					}
					req.session.user = user;
					res.send(200);
				});
			
			});
	});
};
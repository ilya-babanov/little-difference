var honeypotCheck = require('./middleware/honeypotCheck'),
	loadUser = require('./middleware/loadUser'),
	createSessionToken = require('./logic/createSessionToken'),
	exceptLogged = require('./middleware/exceptLogged'),
	User = require('../data/models/user');

module.exports = function(app) {
	/**
	 * Create new session for already registered user
	 */
	app.post('/api/session', honeypotCheck, /*exceptLogged, */loadUser, function(req, res) {
		if (!req.session.user && req.user.password === req.body.password){
			req.session.user = req.user;
		}
		
		if (req.session.user) {
			var userData = User.dataForOwner(req.session.user);
			userData.token2 = createSessionToken();
			req.session.token = userData.token;
			res.send(200, userData);
		} else {
			res.send(404, 'Password is wrong for that username');
		}
	});
	
	/**
	 * Delete session
	 */
	app.del('/api/session', function(req, res) {
		req.session.destroy();
		res.send(200);
	});

	/**
	 * Start counting time right after user came to home page
	 * Stop counting in ../middleware/delayCheck.js after user tried to login or register
	 * If interval would be very small, we don't allow it's action (protection from bots)
	 */
	app.get('/api/session/time', function (req, res) {
		req.session.startRegistrationTime = +new Date();
		res.send(200);
	});
};
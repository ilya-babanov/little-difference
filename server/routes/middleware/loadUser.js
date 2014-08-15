var User = require('../../data/models/user');

function loadUser(req, res, next) {
	var name = req.params.name || req.body.name;
	
	if (!name) {
		res.send(404, 'User with that username not found');
		return;
	}

	if (name === 'me') {
		if (req.session.user) {
			name = req.session.user.name;
		} else {
			res.send(401, 'Unauthorized');
			return;
		}
	}
	
	User.findOne({name: name},
		function(err, user) {
			if (err || !user) {
				res.send(404, 'User with that username not found');
				return;
			}
			req.user = user;
			next();
		});
}
module.exports = loadUser;
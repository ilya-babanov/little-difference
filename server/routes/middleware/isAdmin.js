var User = require('../../data/models/user');

function isAdmin(req, res, next) {
	if (!req.user || req.user.type !== User.types.ADMIN) {
		res.send(403, 'Only for administrators');
	} else {
		next();
	}
}

module.exports = isAdmin;

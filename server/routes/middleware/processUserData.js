var User = require('../../data/models/user');

function processUserData(req, res, next) {
	if (!req.session.user.type) req.session.user.type = User.types.BUDDY;
	console.log('req.user.type: ', req.session.user.type, User.types);
	switch (req.session.user.type) {
		case User.types.BUDDY:
		case User.types.AUTHOR:
			for (var i = 0, len = User.buddyNotAllowed.length; i < len; i++) {
				var param = User.buddyNotAllowed[i];
				if (param in req.body) {
					console.log('param: ', param);
					res.send(403, 'Forbidden: illegal data');
					return;
				}
			}
			next();
			break;
		case User.types.ADMIN:
			next();
			break;
		default:
			res.send(403, 'Forbidden: unknown user type');
			break;
	}
}

module.exports = processUserData;

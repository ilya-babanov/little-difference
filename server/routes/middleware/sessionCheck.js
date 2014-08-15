
function sessionCheck(req, res, next) {
	if (!req.session.user) {
		res.send(401, 'Unauthorized');
	} else if (!req.query || req.session.token != req.query.token) {
		res.send(401, 'Invalid session token');
	} else {
		next();
	}
}

module.exports = sessionCheck;

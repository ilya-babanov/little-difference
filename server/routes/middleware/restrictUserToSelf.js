function restrictUserToSelf(req, res, next) {
	var name = req.params.name || req.body.name;
	if (req.session.user.name !== name) {
		res.send(403, 'You can make this action only with yourself');
	} else {
		next();
	}
}
module.exports = restrictUserToSelf;

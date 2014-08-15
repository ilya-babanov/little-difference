function exceptLogged(req, res, next){
	if (req.session.user) {
		res.send(403, 'Already logged');
	} else {
		next();
	}
}

module.exports = exceptLogged;
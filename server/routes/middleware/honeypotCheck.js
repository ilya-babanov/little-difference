function honeypotCheck(req, res, next){
	console.log('req.body.honeypot: ', req.body.honeypot);
	if (!req.body.honeypot) {
		next();
	} else {
		res.send(400, 'Something get wrong... Maybe you are not human?');
	}
}

module.exports = honeypotCheck;
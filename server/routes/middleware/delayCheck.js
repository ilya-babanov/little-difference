function delayCheck(req, res, next){
	if (req.session.startRegistrationTime && Number(new Date()) - req.session.startRegistrationTime > 4000) {
		next();
	} else {
		console.error('ERROR: delayCheck');
		res.send(403, 'Something get wrong... Maybe you are not human?');
	}
}

module.exports = delayCheck;
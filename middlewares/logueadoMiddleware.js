function logueado(req, res, next) {
	if (req.session.userLogged) {
		  return res.redirect('/home');
	}
	 next();
}

module.exports = logueado;
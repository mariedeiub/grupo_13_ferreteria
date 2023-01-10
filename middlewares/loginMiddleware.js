module.exports = function guestMiddleware (req, res, next) {
	if (req.session.id != undefined) {
		return res.redirect('/users/profile');
	}
	next();
}
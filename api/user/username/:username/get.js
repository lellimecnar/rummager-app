module.exports = function(req, res, next) {
	req.app.db.model('User')
		.findOne({
			username: req.params.username
		}, function(err, user) {
			if (!err) {
				if (user) {
					res.json({exists: true});
				} else {
					res.json({exists: false});
				}
			} else {
				next(err);
			}
		});
};
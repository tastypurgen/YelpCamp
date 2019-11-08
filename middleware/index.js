const Campground = require('../models/campground');
const Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	req.flash('error', 'You need to login first!');
	res.redirect('/login');
};

middlewareObj.checkCampOwnership = (req, res, next) => {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCamp) => {
			if (err) {
				req.flash('error', 'Campground not found');
				res.redirect('back');
			}
			else {
				if (foundCamp.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'It is not your campground!');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to login first!');
		res.redirect('back');
	}
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) res.redirect('back');
			else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'It is not your comment!');
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

module.exports = middlewareObj;
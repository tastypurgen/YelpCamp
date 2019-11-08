const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');

router.get('/new', isLoggedIn, (req, res) => {
	//find camp id
	Campground.findById(req.params.id, (err, camp) => {
		if (err) console.log(err);
		else res.render('comments/new', { campground: camp });
	});
});

router.post('/', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if (err) console.log(err);
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) console.log(err);
				else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;

					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// EDIT
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) res.redirect('back');
		else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	}); 
});


router.put('/:comment_id', checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
		if (err) res.redirect('back');
		else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});


// DELETE
 router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id, (err) => {
		if (err) res.redirect('/campgrounds');
		else {
			res.redirect('back');
		}
	});
 });

function checkCommentOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) res.redirect('back');
			else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
} 

module.exports = router;
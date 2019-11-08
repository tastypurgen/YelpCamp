const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleWare = require('../middleware');

router.get('/new', middleWare.isLoggedIn, (req, res) => {
	//find camp id
	Campground.findById(req.params.id, (err, camp) => {
		if (err) console.log(err);
		else res.render('comments/new', { campground: camp });
	});
});

router.post('/', middleWare.isLoggedIn, (req, res) => {
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
					req.flash('success', 'Successfully!');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// EDIT
router.get('/:comment_id/edit', middleWare.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) res.redirect('back');
		else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	}); 
});


router.put('/:comment_id', middleWare.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
		if (err) res.redirect('back');
		else {
			req.flash('success', 'Successfully!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});


// DELETE
 router.delete('/:comment_id', middleWare.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id, (err) => {
		if (err) res.redirect('/campgrounds');
		else {
			req.flash('success', 'Successfully!');
			res.redirect('back');
		}
	});
 });

module.exports = router;
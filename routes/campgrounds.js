const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleWare = require('../middleware');

router.get('/', (req, res) => {
	// Get all camps from DB
	Campground.find({}, (err, allCamps) => {
		if (err)console.log(err);
		else res.render('campgrounds/index', {campgrounds:allCamps});
	});
});

router.post('/', middleWare.isLoggedIn, (req, res) => {
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCamp = {name: req.body.name, img: req.body.img, description: req.body.description, author: author};
	Campground.create(newCamp, (err, newCamp) => {
			if (err)console.log(err);
			else {
				res.redirect('/campgrounds');
			}
		}
	);
}); 

router.get('/new', middleWare.isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

// SHOW
router.get('/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec((err, foundCamp) => {
		if (err)console.log(err);
		else res.render('campgrounds/show', {campground: foundCamp});
	});
});

// EDIT
router.get('/:id/edit', middleWare.checkCampOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		res.render('campgrounds/edit', {campground: foundCamp});
	});
});

router.put('/:id', middleWare.checkCampOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp) => {
		if (err) res.redirect('/campgrounds');
		else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});


// DELETE
router.delete('/:id', middleWare.checkCampOwnership, (req, res) => {
	Campground.findByIdAndDelete(req.params.id, (err) => {
		if (err) res.redirect('/campgrounds');
		else {
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;
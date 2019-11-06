const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

router.get('/', (req, res) => {
	// Get all camps from DB
	Campground.find({}, (err, allCamps) => {
		if (err)console.log(err);
		else res.render('campgrounds/index', {campgrounds:allCamps});
	});
});

router.post('/', isLoggedIn, (req, res) => {
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	console.log(author);
	let newCamp = {name: req.body.name, img: req.body.img, description: req.body.description, author: author};
	Campground.create(newCamp, (err, newCamp) => {
			if (err)console.log(err);
			else {
				console.log(newCamp);
				res.redirect('/campgrounds');
			}
		}
	);
}); 

router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

// SHOW
router.get('/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec((err, foundCamp) => {
		if (err)console.log(err);
		else res.render('campgrounds/show', {campground: foundCamp});
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
} 

module.exports = router;
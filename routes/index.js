const express = require('express'),
       router = express.Router(),
  	 passport = require('passport'),
		  	 User = require ('../models/user');

router.get('/', (req, res) => {
	res.render('landing');
});

// Show register form
router.get('/register', (req, res) => {
	res.render('register');
});
// Handle sign up logic
router.post('/register', (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, () => {
				req.flash('success', 'Welcome to YelpCamp, ' + user.username + '!');
				res.redirect('/campgrounds');
			});
		}
	});
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}), (req, res) => {});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Logged out!');
	res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
} 

module.exports = router;
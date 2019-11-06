const express       = require('express'),
			app           = express(),
			bodyParser    = require('body-parser'),
			mongoose      = require('mongoose'),
			passport      = require('passport'),
			LocalStrategy = require('passport-local'),
			Campground    = require('./models/campground'),
			User          = require ('./models/user'),
			Comment       = require('./models/comment'),
			seedDB        = require('./seeds');

			// seedDB();
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: 'Dura Lex Sed Lex',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use( (req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	// Get all camps from DB
	Campground.find({}, (err, allCamps) => {
		if (err)console.log(err);
		else res.render('campgrounds/index', {campgrounds:allCamps});
	});
});

app.post('/campgrounds', (req, res) => {
	let newCamp = {name: req.body.name, img: req.body.img, description: req.body.description};
	Campground.create(
		{
			name: newCamp.name,
			img: newCamp.img,
			description: newCamp.description
		}, (err, Campground) => {
			if (err)console.log(err);
			else res.redirect('/campgrounds');
		}
	);
}); 

app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec((err, foundCamp) => {
		if (err)console.log(err);
		else res.render('campgrounds/show', {campground: foundCamp});
	});
});


// COMMENTS ROUTES
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
	//find camp id
	Campground.findById(req.params.id, (err, camp) => {
		if (err)console.log(err);
		else res.render('comments/new', {campground: camp});
	});
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
	console.log(`${req.body.comment.author}`);
	Campground.findById(req.params.id, (err, campground) => {
		if (err)console.log(err);
		else {Comment.create(req.body.comment, (err, comment) => {
			if (err)console.log(err);
		else {campground.comments.push(comment);
			campground.save();
			res.redirect('/campgrounds/' + campground._id);
		}});
	}});
});


// AUTH ROUTES

// Show register form
app.get('/register', (req, res) => {
	res.render('register');
});
// Handle sign up logic
app.post('/register', (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render('register');
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/campgrounds');
			});
		}
	});
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}), (req, res) => {});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}


app.listen(process.env.PORT || 3000, () => {
	console.log('The YelpCamp is started...');
}); 
const express       = require('express'),
			app           = express(),
			bodyParser    = require('body-parser'),
			mongoose      = require('mongoose'),
			passport      = require('passport'),
			LocalStrategy = require('passport-local'),
			Campground    = require('./models/campground'),
			User          = require ('./models/user'),
			Comment       = require('./models/comment'),
			seedDB        = require('./seeds'),
			
			  indexRoutes = require('./routes/index'),
   campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes = require('./routes/comments');

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

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(process.env.PORT || 3000, () => {
	console.log('The YelpCamp is started...');
}); 
const express    = require('express'),
			app        = express(),
			bodyParser = require('body-parser'),
			mongoose   = require('mongoose'),
			Campground = require('./models/campground'),
			Comment    = require('./models/comment'),
			seedDB     = require('./seeds');

			// seedDB();
// mongooose.connect('mongodb://localhost/yelp_camp'); //old
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	// Get all camps from DB
	Campground.find({}, (err, allCamps) => {
		err ? console.log(err) : res.render('campgrounds/index', {campgrounds:allCamps});
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
				err ? console.log(err) : console.log(Campground);
				res.redirect('/campgrounds');
		}
	);
}); 

app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec((err, foundCamp) => {
		err ? console.log(err) : res.render('campgrounds/show', {campground: foundCamp});
	});
});


// COMMENTS ROUTES
app.get('/campgrounds/:id/comments/new', (req, res) => {
	//find camp id
	Campground.findById(req.params.id, (err, camp) => {
		err ? console.log(err) : res.render('comments/new', {campground: camp});
	});
});

app.post('/campgrounds/:id/comments', (req, res) => {
	console.log(`${req.body.comment.author}`);
	Campground.findById(req.params.id, (err, campground) => {
		err ? console.log(err) : 
		Comment.create(req.body.comment, (err, comment) => {
			err ? console.log(err) : 
			campground.comments.push(comment);
			campground.save();
			res.redirect('/campgrounds/' + campground._id);
		});
	});
});



app.listen(process.env.PORT || 3000, () => {
	console.log('The YelpCamp is started...');
}); 
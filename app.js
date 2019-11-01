const express    = require('express'),
			app        = express(),
			bodyParser = require('body-parser'),
			mongoose   = require('mongoose'),
			Campground = require('./models/campground'),
			seedDB     = require('./seeds');

			seedDB();
// mongooose.connect('mongodb://localhost/yelp_camp'); //old
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



// SCHEMA SETUP

//  Campground.create(
// 	{
// 		name: 'Batumi Rest', 
// 		img: 'https://georgiantour.com/wp-content/uploads/2015/03/2bdc239f8dc96232f09f8d2de4db0ea3-1-750x400.jpg',
// 		description: 'This is a decription of Batumi'
// 	}, (err, Campground) => {
// 		err ? console.log(err) : console.log(Campground);
// 	}
//  );


app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	// Get all camps from DB
	Campground.find({}, (err, allCamps) => {
		err ? console.log(err) : res.render('index', {campgrounds:allCamps});
	});
});

app.post('/campgrounds', (req, res) => {
console.log(req.body);
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
	res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campground.findById(req.params.id, (err, foundCamp) => {
		err ? console.log(err) : res.render('show', {campground: foundCamp});
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log('The YelpCamp is started...');
}); 
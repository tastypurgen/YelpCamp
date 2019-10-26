const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


let campgrounds = [
	{name: 'Pinsk Resort', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trailer_Camping_Marmora_KOA_May_2006.jpg/220px-Trailer_Camping_Marmora_KOA_May_2006.jpg'},
	{name: 'Heaven Spa', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Unidentified_group_of_men_camping.jpg/220px-Unidentified_group_of_men_camping.jpg'},		
	{name: 'Bright landscape', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Thomas_Hiram_Holding.jpg/220px-Thomas_Hiram_Holding.jpg'},
	{name: 'Pinsk Resort', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trailer_Camping_Marmora_KOA_May_2006.jpg/220px-Trailer_Camping_Marmora_KOA_May_2006.jpg'},
	{name: 'Heaven Spa', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Unidentified_group_of_men_camping.jpg/220px-Unidentified_group_of_men_camping.jpg'},
	{name: 'Pinsk Resort', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trailer_Camping_Marmora_KOA_May_2006.jpg/220px-Trailer_Camping_Marmora_KOA_May_2006.jpg'},
	{name: 'Heaven Spa', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Unidentified_group_of_men_camping.jpg/220px-Unidentified_group_of_men_camping.jpg'},
	{name: 'Pinsk Resort', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trailer_Camping_Marmora_KOA_May_2006.jpg/220px-Trailer_Camping_Marmora_KOA_May_2006.jpg'},
	{name: 'Heaven Spa', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Unidentified_group_of_men_camping.jpg/220px-Unidentified_group_of_men_camping.jpg'},
];

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', {campgrounds:campgrounds});
});

app.post('/campgrounds', (req, res) => {
console.log(req.body);
	let newCamp = {name: req.body.name, img: req.body.img};
	campgrounds.push(newCamp);

	res.redirect('/campgrounds');
}); 

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('The YelpCamp is started...');
}); 
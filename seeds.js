const mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment');

var data = [{
	name: 'Minsk',
	img: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/10/23/17/minsk-cityscape.jpg?w968h681',
	description: 'blah blah blah'
}, {
	name: 'Pinsk',
	img: 'https://www.vedaj.by/images/cities/bre/pinsk/Pinsk/Pinsk5.jpg',
	description: 'blah blah blah'
}, {
	name: 'Butumi',
	img: 'https://georgiantravelguide.com/storage/files/batumi-achara-ghamis-batumi-batumi-adjara-night-in-batumi.jpg',
	description: 'blah blah blah'
}, ];

var seedDB = () => {
	// Remove all camps
	Campground.deleteMany({}, (err) => {
			err ? console.log(err) : console.log('All removed!');

			data.forEach((camp) => {
				Campground.create(camp, (err, camp) => {
					err ? console.log(err) : console.log('Camp added!');

					Comment.create({
						text: 'Awesome comment!',
						author: 'Homer'
					}, (err, comment) => {
						err ? console.log(err) : 
						camp.comments.push(comment);
						camp.save();
						console.log('Com  added!');
					});
				});
			});
			// Add a few camps;
			// Add a few comments
		});
	};
module.exports = seedDB;
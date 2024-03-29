const mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment');

var data = [{
	name: 'Minsk resort',
	img: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/10/23/17/minsk-cityscape.jpg?w968h681',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, tenetur eum iure eveniet culpa saepe iusto architecto quisquam beatae voluptas ab. Accusantium atque deleniti sapiente. Velit perferendis odio minus optio labore, ex non a fugit, sapiente tenetur explicabo aliquam quibusdam voluptas beatae quisquam! Tenetur officia expedita facilis quo minus quos et iure molestias sunt. Dolores, nulla laborum recusandae aspernatur neque et! Deleniti vero unde quam fugit debitis eos saepe, molestias tempore impedit ducimus? Fugit est deserunt quaerat eaque a tempore nostrum doloremque odio quos maxime nesciunt consequatur natus hic accusantium, dolorem fuga voluptatum unde neque ratione perferendis corporis commodi architecto.', 
	"author": { 
		"id": "5dc27e1da4321208981161d7", 
		"username": "asd" 
	}, "__v": 0 }, { 
	"_id": "5dc41447a25fdb3904386aea", 
	"comments": [], 
	"name": "asd", 
	"img": "https://gravatar.com/avatar/100a3459461f968ef7deaef2515dd4ea?s=96&d=https://www.herokucdn.com/images/ninja-avatar-96x96.png", 
	"description": "xzc", 
	"author": { 
		"id": "5dc27e1da4321208981161d7", 
		"username": "asd" 
	}, "__v": 0 }, {
	name: 'Pinsk Resort',
	img: 'https://www.vedaj.by/images/cities/bre/pinsk/Pinsk/Pinsk5.jpg',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, tenetur eum iure eveniet culpa saepe iusto architecto quisquam beatae voluptas ab. Accusantium atque deleniti sapiente. Velit perferendis odio minus optio labore, ex non a fugit, sapiente tenetur explicabo aliquam quibusdam voluptas beatae quisquam! Tenetur officia expedita facilis quo minus quos et iure molestias sunt. Dolores, nulla laborum recusandae aspernatur neque et! Deleniti vero unde quam fugit debitis eos saepe, molestias tempore impedit ducimus? Fugit est deserunt quaerat eaque a tempore nostrum doloremque odio quos maxime nesciunt consequatur natus hic accusantium, dolorem fuga voluptatum unde neque ratione perferendis corporis commodi architecto.', 
	"author": { 
		"id": "5dc27e1da4321208981161d7", 
		"username": "asd" 
	}, "__v": 0 }, {
	name: 'Butumi Resort',
	img: 'https://georgiantravelguide.com/storage/files/batumi-achara-ghamis-batumi-batumi-adjara-night-in-batumi.jpg',
	description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, tenetur eum iure eveniet culpa saepe iusto architecto quisquam beatae voluptas ab. Accusantium atque deleniti sapiente. Velit perferendis odio minus optio labore, ex non a fugit, sapiente tenetur explicabo aliquam quibusdam voluptas beatae quisquam! Tenetur officia expedita facilis quo minus quos et iure molestias sunt. Dolores, nulla laborum recusandae aspernatur neque et! Deleniti vero unde quam fugit debitis eos saepe, molestias tempore impedit ducimus? Fugit est deserunt quaerat eaque a tempore nostrum doloremque odio quos maxime nesciunt consequatur natus hic accusantium, dolorem fuga voluptatum unde neque ratione perferendis corporis commodi architecto.', 
	"author": { 
		"id": "5dc27e1da4321208981161d7", 
		"username": "asd" 
	}, "__v": 0 },];
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
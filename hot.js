// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Star Wars Characters (DATA)
// =============================================================
// var reservations = [{
// 	"reservation_id": 1,
// 	"name": "Name1",
// 	"email": "email@email.com",
// 	"phone": "123-456-7890",
// 	"num_in_party": 2
// },{
// 	"reservation_id": 2,
// 	"name": "Name2",
// 	"email": "email@email.com",
// 	"phone": "123-456-7890",
// 	"num_in_party": 2
// }];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/reservation', function (req, res) {
	res.sendFile(path.join(__dirname, 'reservation.html'));
});

app.get('/list', function (req, res) {
	res.sendFile(path.join(__dirname, 'list.html'));
});

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:reservations?', function (req, res) {
	var chosen = req.params.reservations;

	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < reservations.length; i++) {
			if (chosen === reservations[i].routeName) {
				res.json(reservations[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(reservations);
	}
});

// Create New Characters - takes in JSON input
app.post('/api/new', function (req, res) {
	var newcharacter = req.body;
	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase();

	console.log(newcharacter);

	characters.push(newcharacter);

	res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});

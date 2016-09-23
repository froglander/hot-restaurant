// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
var dataFile = "database.json";

var reservationData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));


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
app.get('/api', function (req, res) {
	res.json(reservationData);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});


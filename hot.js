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


try {
    var reservationData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}
catch(err) {
	// File doesn't exit so create object	
    var reservationData =  {data:[]};
}

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
	console.log(reservationData.data.length);
});

// Create New reservation - takes in JSON input
app.post('/api/new', function (req, res) {
	if(!req.body) return res.end();

	var newreservation = req.body;
	
	newreservation.reservation_id = reservationData.data.length+1;

	reservationData.data.push(newreservation);

	fs.writeFile(dataFile, JSON.stringify(reservationData, null, 4), function(err) {
		if(err) {
			return console.log(err);
		}
	});


	res.json(newreservation);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});


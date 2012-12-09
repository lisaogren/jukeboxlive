/**
 * Start the meteor server
 *
 * @author Carl Ogren
 */
Meteor.startup(function() {

	Bands.remove({});
	Venues.remove({});
	Concerts.remove({});
	Songs.remove({});

	// Test data for the application
	if (Bands.find().count() === 0) {
		// Bands
		var bandsList = [
			{ "name": "GMH", "description": "Melodic Punk Metal", "origin": "France" }
			// { "name": "Rock'Ave", "description": "Rock'n'Roll Blues", "origin": "France" },
			// { "name": "Roux Libres", "description": "Chanson française", "origin": "France" }
		];

		var venuesList = [
			{ "name": "Vane Day Bar", "address": "30 avenue Pasteur", "zip": "93100", "city": "Montreuil" }
		];

		// Loop through each venue
		for (var i in venuesList) {
			// Insert venue
			Venues.insert(venuesList[i]);
		}

		// Loop through each bands
		for (var i in bandsList) {
			// Insert band
			var bandId = Bands.insert(bandsList[i]),
				venueId = Venues.findOne({ "name": "Vane Day Bar" })._id;

			// Create a concert for the band
			var concertId = Concerts.insert({
				"label": "Concert " + bandsList[i].name,
				"date": new Date(),
				"venueId": venueId,
				"bandId": bandId
			});

			for (var j = 0; j < 10; j++) {
				Songs.insert({
					"name": "Song #" + (j + 1),
					"concertId": concertId,
					"position": (j + 1),
					"votes": []
				});
			}
		}
	}
});